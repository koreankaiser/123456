
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_72nku9r',
  TEMPLATE_ID: 'template_gj7jem9',
  PUBLIC_KEY: '0pSJmBIY2juWJL7rM'
};

export const sendEmail = async (templateParams: Record<string, any>) => {
  const data = {
    service_id: EMAILJS_CONFIG.SERVICE_ID,
    template_id: EMAILJS_CONFIG.TEMPLATE_ID,
    user_id: EMAILJS_CONFIG.PUBLIC_KEY,
    template_params: templateParams,
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS Error: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
