const dns = require('dns').promises;
(async () => {
  try {
    const res = await dns.resolveSrv('_mongodb._tcp.cluster0.0chehkq.mongodb.net');
    console.log('SRV records:', res);
  } catch (err) {
    console.error('SRV lookup error:', err);
    process.exit(1);
  }
})();
