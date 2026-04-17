import { useState, useCallback, useEffect } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { apiService } from '@/services/apiService';
import { API_CODES } from '@/constants/apiConstants';
import { useDialog } from '@/hooks/useDialog';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from '@/context/SnackbarContext';
import { useLoginContext } from '@/context/LoginContext';

export function useAdminEmail() {
  // ── User context (for signature) ────────────────────────────────────────────
  const { user } = useLoginContext();

  // ── Dialog (confirmation before send) ───────────────────────────────────────
  const confirmDialog = useDialog();
  const { getFechData } = useFetchDataPromise();

  // ── Available contacts (from API) ───────────────────────────────────────────
  const location = useLocation();
  const [availableContacts, setAvailableContacts] = useState([]);
  const [contactsLoading, setContactsLoading]     = useState(true);

  // ── Composer state ──────────────────────────────────────────────────────────
  const [recipients, setRecipients]             = useState([]);

  // Handle initialization from navigation state (Quick Reply)
  useEffect(() => {
    if (location.state?.replyTo) {
      const email = location.state.replyTo;
      const name = location.state.replyName || email;
      setRecipients([{ email, name }]);
      
      // Clear state after reading to prevent re-initialization on refresh/remount
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  const [recipientInput, setRecipientInput]     = useState('');
  const [subject, setSubject]                   = useState('');
  const [body, setBody]                         = useState('');
  const [attachments, setAttachments]           = useState([]);
  const [isSending, setIsSending]               = useState(false);
  const [sendSuccess, setSendSuccess]           = useState(false);
  const [resetKey, setResetKey]                 = useState(0);

  const { showSnackbar } = useSnackbar();

  // ── Fetch available recipients ──────────────────────────────────────────────
  const fetchAvailableContacts = useCallback(async () => {
    setContactsLoading(true);
    try {
      const response = await getFechData({
        endPoint: 'notifications/emails',
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setAvailableContacts(response.data?.list ?? []);
      } else {
        setAvailableContacts([]);
      }
    } catch {
      setAvailableContacts([]);
    } finally {
      setContactsLoading(false);
    }
  }, [getFechData]);

  useEffect(() => {
    fetchAvailableContacts();
  }, [fetchAvailableContacts]);

  // ── Composer methods ────────────────────────────────────────────────────────

  /** Add a recipient on Enter or Comma keydown — uses email as name fallback */
  const handleRecipientKeyDown = useCallback((e) => {
    if ((e.key === 'Enter' || e.key === ',') && recipientInput.trim()) {
      e.preventDefault();
      const email = recipientInput.trim().replace(/,$/, '');
      const alreadyAdded = recipients.some((r) => r.email === email);
      if (email && !alreadyAdded) {
        // Try to find the name from available contacts, otherwise use email as name
        const found = availableContacts.find((c) => c.email === email);
        setRecipients((prev) => [...prev, { email, name: found?.name ?? email }]);
      }
      setRecipientInput('');
    }
  }, [recipientInput, recipients, availableContacts]);

  /** Add a recipient from autocomplete click — receives full {name, email} object */
  const addRecipient = useCallback(({ name, email }) => {
    const alreadyAdded = recipients.some((r) => r.email === email);
    if (email && !alreadyAdded) {
      setRecipients((prev) => [...prev, { name, email }]);
    }
    setRecipientInput('');
  }, [recipients]);

  /** Remove a recipient by email value */
  const removeRecipient = useCallback((email) => {
    setRecipients((prev) => prev.filter((r) => r.email !== email));
  }, []);

  /** Reset the composer to its blank state */
  const resetComposer = useCallback(() => {
    setRecipients([]);
    setRecipientInput('');
    setSubject('');
    setBody('');
    setAttachments([]);
    setSendSuccess(false);
    setResetKey((k) => k + 1); // forces TiptapEditor remount → clears editor
  }, []);

  /** Open the confirmation dialog (validates required fields first) */
  const requestSendConfirm = useCallback(() => {
    if (!recipients.length || !subject.trim() || !body.trim()) return;
    confirmDialog.handleOpenDialog();
  }, [recipients, subject, body, confirmDialog.handleOpenDialog]);

  /** Close without sending */
  const cancelSend = useCallback(() => {
    confirmDialog.handleCloseDialog();
  }, [confirmDialog.handleCloseDialog]);

  /**
   * Converts a File object to a base64 string (without the data-uri prefix).
   * e.g.  "JVBERi0xLjMg..." for a PDF
   */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result.split(',')[1]); // strip "data:...;base64,"
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  /** Confirmed — embeds attachments into content HTML then sends */
  const confirmSend = useCallback(async () => {
    confirmDialog.handleCloseDialog();
    setIsSending(true);
    setSendSuccess(false);

    try {
      let finalContent = body;
      let preparedAttachments = [];

      if (attachments.length > 0) {
        let visualAttachmentsHtml = '<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">';
        visualAttachmentsHtml += '<p style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Attached Files</p>';
        visualAttachmentsHtml += '<div style="display: block;">';

        preparedAttachments = await Promise.all(
          attachments.map(async (file) => {
            const b64 = await fileToBase64(file);
            const kb = (file.size / 1024).toFixed(1);
            
            // Just a visual representation in the HTML (No base64 here)
            visualAttachmentsHtml += `
              <div style="display:inline-block; margin-bottom: 8px; margin-right: 8px; padding: 10px 16px; background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: #374151;">
                <span style="font-size: 16px; margin-right: 6px; vertical-align: middle;">${file.type.includes('pdf') ? '📄' : '🖼️'}</span>
                <span style="font-weight: 600; vertical-align: middle;">${file.name}</span>
                <span style="color: #9ca3af; margin-left: 4px; font-size: 12px; vertical-align: middle;">(${kb} KB)</span>
              </div>
            `;

            return {
              filename: file.name,
              content: b64,
              encoding: 'base64'
            };
          })
        );
        
        visualAttachmentsHtml += '</div></div>';
        finalContent += visualAttachmentsHtml;
      }

      const photoUrl = user?.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'Manager') + '&background=FFD700&color=111';
      const signatureHtml = `
        <div style="margin-top: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
          <p style="margin-bottom: 20px; font-size: 14px;">Sincerely,</p>
          
          <table style="border-collapse: collapse; max-width: 650px; width: 100%;">
            <tr>
              <!-- Foto -->
              <td style="padding-right: 20px; border-right: 2px solid #FFD700; width: 80px; text-align: center; vertical-align: middle;">
                <img 
                  src="${photoUrl}" 
                  alt="Profile" 
                  style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" 
                />
              </td>
              <!-- Datos Personales -->
              <td style="padding-left: 20px; padding-right: 20px; vertical-align: middle;">
                <h3 style="margin: 0; color: #111; font-size: 18px; line-height: 1.2;">
                  ${user?.name || 'Director'}
                </h3>
                <p style="margin: 2px 0 8px 0; color: #eab308; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${user?.rol || 'NovaSolutions Manager'}
                </p>
                <div style="font-size: 11px; color: #555; line-height: 1.6;">
                  <p style="margin: 0;">&#9993; <a href="mailto:${user?.email}" style="color: #555; text-decoration: none;">${user?.email || 'contacto@novasolutions.com'}</a></p>
                  <p style="margin: 0;">&#128222; ${user?.phone || '+593 999 999 999'}</p>
                  <p style="margin: 0;">&#127760; <a href="https://www.novasolutions.com" style="color: #555; text-decoration: none;">www.novasolutions.com</a></p>
                  <p style="margin: 0;">&#128205; Loja - Ecuador</p>
                </div>
              </td>
              <!-- Logo lateral -->
              <td style="padding-left: 10px; text-align: right; vertical-align: middle;">
                <div style="background-color: #111; border-radius: 8px; padding: 12px; display: inline-block;">
                  <!-- Logo de la empresa en lugar del QR -->
                  <img src="https://res.cloudinary.com/driyxelzh/image/upload/w_260,h_144,f_auto,q_auto,dpr_2.0/v1758224762/para_fondos_obscuros_eyaupu.png" 
                       alt="NovaSolutions" style="width: 80px; height: auto; object-fit: contain;" />
                </div>
              </td>
            </tr>
          </table>

          <div style="margin-top: 30px; border-top: 1px dotted #e5e7eb; padding-top: 15px;">
            <p style="margin: 0 0 5px 0; font-size: 10px; font-weight: bold; color: #777;">
              Confidentiality Notice:
            </p>
            <p style="margin: 0; font-size: 9px; color: #888; text-align: justify; line-height: 1.4;">
              This email, including any attachments, contains confidential information from NovaSolutions and is intended solely for its recipient. If you are not the intended recipient, please notify the sender immediately, refrain from using, disclosing, or distributing the content, and delete it permanently. Any unauthorized use of this information is strictly prohibited and could be subject to legal action.
            </p>
          </div>
        </div>
      `;

      finalContent += signatureHtml;

      const professionalEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.05); max-width: 600px; width: 100%; border: 1px solid #f3f4f6;">
                
                <!-- HEADER (Logo Banner) -->
                <tr>
                  <td style="background-color: #000000; padding: 25px 35px; text-align: center; border-bottom: 4px solid #FFD700;">
                    <img src="https://res.cloudinary.com/driyxelzh/image/upload/w_260,h_144,f_auto,q_auto,dpr_2.0/v1758224762/para_fondos_obscuros_eyaupu.png" alt="NovaSolutions" style="max-height: 45px; display: block; margin: 0 auto;" />
                  </td>
                </tr>

                <!-- CONTENT BODY -->
                <tr>
                  <td style="padding: 35px; color: #374151; font-size: 15px; line-height: 1.6;">
                    ${finalContent}
                  </td>
                </tr>
              </table>
              
              
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                <tr>
                  <td style="padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    © ${new Date().getFullYear()} NovaSolutions. All rights reserved.<br>
                    Sent from the Operations Center
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `;

      const response = await apiService.request({
        endPoint: 'notifications/send',
        method: 'POST',
        additionalData: {
          subject,
          content: professionalEmailHtml,
          emails: recipients.map((r) => r.email),
          attachments: preparedAttachments, 
        },
      });

      if (response?.code === API_CODES.OK) {
        showSnackbar('Email sent successfully', 'success');
        setSendSuccess(true);
        resetComposer();
      } else {
        showSnackbar(response?.message || 'Error while sending the email', 'error');
      }
    } catch (err) {
      showSnackbar(err?.message || 'Error while sending the email', 'error');
    } finally {
      setIsSending(false);
    }
  }, [recipients, subject, body, attachments, resetComposer, confirmDialog.handleCloseDialog, showSnackbar]);



  /**
   * Add files — validates type (images + PDF only) and size (max 2 MB).
   * Rejected files are reported via attachmentErrors (auto-clears after 4s).
   */
  const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB
  const ALLOWED_TYPES  = /^(image\/.+|application\/pdf)$/;

  const addAttachments = useCallback((e) => {
    const files  = Array.from(e.target.files ?? []);
    const errors = [];
    const valid  = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.test(file.type)) {
        errors.push(`"${file.name}" is not an image or a PDF.`);
      } else if (file.size > MAX_FILE_BYTES) {
        errors.push(`"${file.name}" exceeds the 2 MB limit.`);
      } else {
        valid.push(file);
      }
    });

    if (errors.length > 0) {
      showSnackbar(errors.join(' '), 'warning');
    }

    if (valid.length > 0) {
      setAttachments((prev) => {
        const existing = new Set(prev.map((f) => f.name));
        return [...prev, ...valid.filter((f) => !existing.has(f.name))];
      });
    }

    e.target.value = ''; // allow re-selecting same file
  }, []);

  /** Remove a single attachment by file name */
  const removeAttachment = useCallback((name) => {
    setAttachments((prev) => prev.filter((f) => f.name !== name));
  }, []);

  // ── Autocomplete suggestions ────────────────────────────────────────────────
  // Filter available contacts by what the user is typing in the To field
  const suggestions = recipientInput.trim().length > 0
    ? availableContacts.filter(
        (c) =>
          !recipients.some((r) => r.email === c.email) &&
          (c.name.toLowerCase().includes(recipientInput.toLowerCase()) ||
           c.email.toLowerCase().includes(recipientInput.toLowerCase()))
      )
    : [];

  // ── Derived ─────────────────────────────────────────────────────────────────
  const isComposerReady =
    recipients.length > 0 && subject.trim().length > 0 && body.trim().length > 0;

  return {
    // contacts from API
    availableContacts,
    contactsLoading,
    suggestions,

    // composer state
    recipients,
    recipientInput,
    subject,
    body,
    attachments,
    isSending,
    sendSuccess,
    isComposerReady,

    // confirm dialog — exposed via useDialog interface
    confirmDialog,          // { isOpen, handleOpenDialog, handleCloseDialog }
    requestSendConfirm,
    cancelSend,
    confirmSend,

    // editor reset key
    resetKey,

    // setters consumed by inputs
    setRecipientInput,
    setSubject,
    setBody,

    // actions
    handleRecipientKeyDown,
    addRecipient,
    removeRecipient,
    addAttachments,
    removeAttachment,
    resetComposer,
  };
}
