const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Auth API</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: #fff; min-height: 100vh; }

        /* NAVBAR */
        nav {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        nav .logo { font-size: 22px; font-weight: 700; color: #7c3aed; }
        nav .logo span { color: #fff; }
        nav .status { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #10b981; }
        nav .status .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* HERO */
        .hero {
          text-align: center;
          padding: 80px 20px 60px;
          background: radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 70%);
        }
        .hero .badge {
          display: inline-block;
          background: rgba(124,58,237,0.2);
          border: 1px solid rgba(124,58,237,0.4);
          color: #a78bfa;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          margin-bottom: 24px;
        }
        .hero h1 { font-size: 52px; font-weight: 800; line-height: 1.2; margin-bottom: 20px; }
        .hero h1 span { background: linear-gradient(135deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { font-size: 18px; color: #94a3b8; max-width: 600px; margin: 0 auto 40px; line-height: 1.7; }
        .hero .base-url {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 24px;
          border-radius: 10px;
          font-family: monospace;
          font-size: 16px;
          color: #7c3aed;
        }

        /* STATS */
        .stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 40px 20px;
          flex-wrap: wrap;
        }
        .stat { text-align: center; }
        .stat .num { font-size: 36px; font-weight: 800; color: #7c3aed; }
        .stat .label { font-size: 13px; color: #64748b; margin-top: 4px; }

        /* SECTION */
        .section { max-width: 1000px; margin: 0 auto; padding: 20px 20px 60px; }
        .section-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 30px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .section-title span { color: #7c3aed; }

        /* ENDPOINT CARDS */
        .endpoint-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
          transition: border-color 0.3s;
        }
        .endpoint-card:hover { border-color: rgba(124,58,237,0.4); }
        .endpoint-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; flex-wrap: wrap; }
        .method {
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          font-family: monospace;
        }
        .method.post { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
        .method.get { background: rgba(59,130,246,0.15); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }
        .endpoint-path { font-family: monospace; font-size: 16px; color: #e2e8f0; font-weight: 600; }
        .auth-badge {
          margin-left: auto;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }
        .auth-badge.required { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
        .auth-badge.public { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
        .endpoint-desc { color: #94a3b8; font-size: 15px; margin-bottom: 20px; line-height: 1.6; }

        /* CODE BLOCKS */
        .code-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width: 700px) { .code-grid { grid-template-columns: 1fr; } }
        .code-block { background: #0d1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; }
        .code-block .code-title { padding: 10px 16px; font-size: 12px; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); }
        .code-block pre { padding: 16px; font-size: 13px; line-height: 1.7; overflow-x: auto; color: #e2e8f0; }
        .code-block pre .key { color: #7c3aed; }
        .code-block pre .val { color: #10b981; }
        .code-block pre .str { color: #f59e0b; }
        .code-block pre .comment { color: #475569; }

        /* STEPS */
        .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          transition: transform 0.3s;
        }
        .step-card:hover { transform: translateY(-4px); }
        .step-num {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 18px;
          margin-bottom: 16px;
        }
        .step-card h3 { font-size: 18px; margin-bottom: 10px; }
        .step-card p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
        .step-card code { background: rgba(124,58,237,0.15); color: #a78bfa; padding: 2px 8px; border-radius: 4px; font-size: 13px; }

        /* TECH STACK */
        .tech-grid { display: flex; flex-wrap: wrap; gap: 14px; }
        .tech-badge {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          transition: border-color 0.3s;
        }
        .tech-badge:hover { border-color: rgba(124,58,237,0.5); }
        .tech-badge .icon { font-size: 22px; }
        .tech-badge .ver { font-size: 12px; color: #64748b; font-weight: 400; }

        /* ERROR CODES */
        .error-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
        .error-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        .error-card .code { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
        .error-card .code.success { color: #10b981; }
        .error-card .code.error { color: #f87171; }
        .error-card .msg { font-size: 13px; color: #64748b; }

        /* FOOTER */
        footer {
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: #475569;
          font-size: 14px;
        }
        footer a { color: #7c3aed; text-decoration: none; }
      </style>
    </head>
    <body>

      <!-- NAVBAR -->
      <nav>
        <div class="logo">🔐 Auth<span>API</span></div>
        <div class="status"><div class="dot"></div> Server Online</div>
      </nav>

      <!-- HERO -->
      <div class="hero">
        <div class="badge">🚀 REST API v1.0</div>
        <h1>User <span>Authentication</span><br>& Authorization API</h1>
        <p>A secure JWT-based authentication system built with Node.js, Express.js, and MongoDB. Register, login, and access protected routes with Bearer tokens.</p>
        <div class="base-url">🌐 Base URL: <strong>/api/auth</strong></div>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat"><div class="num">3</div><div class="label">API Endpoints</div></div>
        <div class="stat"><div class="num">JWT</div><div class="label">Authentication</div></div>
        <div class="stat"><div class="num">bcrypt</div><div class="label">Password Hashing</div></div>
        <div class="stat"><div class="num">MVC</div><div class="label">Architecture</div></div>
      </div>

      <!-- HOW TO USE -->
      <div class="section">
        <div class="section-title">⚡ <span>How to Use</span></div>
        <div class="steps">
          <div class="step-card">
            <div class="step-num">1</div>
            <h3>Register</h3>
            <p>Send a <code>POST</code> request to <code>/api/auth/register</code> with your username, email, and password to create an account.</p>
          </div>
          <div class="step-card">
            <div class="step-num">2</div>
            <h3>Login</h3>
            <p>Send a <code>POST</code> request to <code>/api/auth/login</code> with your email and password. You will receive a <code>JWT token</code>.</p>
          </div>
          <div class="step-card">
            <div class="step-num">3</div>
            <h3>Access Protected Routes</h3>
            <p>Add the token in the header as <code>Authorization: Bearer &lt;token&gt;</code> to access protected routes like <code>/api/auth/me</code>.</p>
          </div>
        </div>
      </div>

      <!-- API ENDPOINTS -->
      <div class="section">
        <div class="section-title">📚 <span>API Endpoints</span></div>

        <!-- Register -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method post">POST</span>
            <span class="endpoint-path">/api/auth/register</span>
            <span class="auth-badge public">🌐 Public</span>
          </div>
          <p class="endpoint-desc">Register a new user account. Password is automatically hashed before saving to database.</p>
          <div class="code-grid">
            <div class="code-block">
              <div class="code-title">📤 Request Body</div>
              <pre>{
  <span class="key">"username"</span>: <span class="str">"johndoe"</span>,
  <span class="key">"email"</span>: <span class="str">"john@example.com"</span>,
  <span class="key">"password"</span>: <span class="str">"password123"</span>
}</pre>
            </div>
            <div class="code-block">
              <div class="code-title">📥 Success Response (201)</div>
              <pre>{
  <span class="key">"success"</span>: <span class="val">true</span>,
  <span class="key">"message"</span>: <span class="str">"User registered successfully"</span>,
  <span class="key">"data"</span>: {
    <span class="key">"id"</span>: <span class="str">"65abc123..."</span>,
    <span class="key">"username"</span>: <span class="str">"johndoe"</span>,
    <span class="key">"email"</span>: <span class="str">"john@example.com"</span>
  }
}</pre>
            </div>
          </div>
        </div>

        <!-- Login -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method post">POST</span>
            <span class="endpoint-path">/api/auth/login</span>
            <span class="auth-badge public">🌐 Public</span>
          </div>
          <p class="endpoint-desc">Login with email and password. Returns a JWT token valid for 7 days.</p>
          <div class="code-grid">
            <div class="code-block">
              <div class="code-title">📤 Request Body</div>
              <pre>{
  <span class="key">"email"</span>: <span class="str">"john@example.com"</span>,
  <span class="key">"password"</span>: <span class="str">"password123"</span>
}</pre>
            </div>
            <div class="code-block">
              <div class="code-title">📥 Success Response (200)</div>
              <pre>{
  <span class="key">"success"</span>: <span class="val">true</span>,
  <span class="key">"message"</span>: <span class="str">"Login successful"</span>,
  <span class="key">"token"</span>: <span class="str">"eyJhbGci..."</span>,
  <span class="key">"data"</span>: {
    <span class="key">"id"</span>: <span class="str">"65abc123..."</span>,
    <span class="key">"username"</span>: <span class="str">"johndoe"</span>,
    <span class="key">"email"</span>: <span class="str">"john@example.com"</span>
  }
}</pre>
            </div>
          </div>
        </div>

        <!-- Get Me -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/auth/me</span>
            <span class="auth-badge required">🔒 Protected</span>
          </div>
          <p class="endpoint-desc">Get current logged-in user profile. Requires valid JWT token in Authorization header.</p>
          <div class="code-grid">
            <div class="code-block">
              <div class="code-title">📤 Request Header</div>
              <pre><span class="comment"># Add this in Headers tab</span>
<span class="key">Authorization</span>: <span class="str">Bearer eyJhbGci...</span>

<span class="comment"># No request body needed</span></pre>
            </div>
            <div class="code-block">
              <div class="code-title">📥 Success Response (200)</div>
              <pre>{
  <span class="key">"success"</span>: <span class="val">true</span>,
  <span class="key">"data"</span>: {
    <span class="key">"id"</span>: <span class="str">"65abc123..."</span>,
    <span class="key">"username"</span>: <span class="str">"johndoe"</span>,
    <span class="key">"email"</span>: <span class="str">"john@example.com"</span>,
    <span class="key">"createdAt"</span>: <span class="str">"2024-01-01..."</span>
  }
}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- TECH STACK -->
      <div class="section">
        <div class="section-title">🛠️ <span>Tech Stack</span></div>
        <div class="tech-grid">
          <div class="tech-badge"><span class="icon">🟢</span> Node.js <span class="ver">v18+</span></div>
          <div class="tech-badge"><span class="icon">⚡</span> Express.js <span class="ver">v4.18</span></div>
          <div class="tech-badge"><span class="icon">🍃</span> MongoDB <span class="ver">v8.0</span></div>
          <div class="tech-badge"><span class="icon">🔑</span> JWT <span class="ver">v9.0</span></div>
          <div class="tech-badge"><span class="icon">🔒</span> bcryptjs <span class="ver">v2.4</span></div>
          <div class="tech-badge"><span class="icon">📦</span> Mongoose <span class="ver">v8.0</span></div>
        </div>
      </div>

      <!-- STATUS CODES -->
      <div class="section">
        <div class="section-title">📊 <span>Response Status Codes</span></div>
        <div class="error-grid">
          <div class="error-card"><div class="code success">200</div><div class="msg">OK - Request Successful</div></div>
          <div class="error-card"><div class="code success">201</div><div class="msg">Created - User Registered</div></div>
          <div class="error-card"><div class="code error">400</div><div class="msg">Bad Request - Invalid Input</div></div>
          <div class="error-card"><div class="code error">401</div><div class="msg">Unauthorized - Invalid Token</div></div>
          <div class="error-card"><div class="code error">404</div><div class="msg">Not Found - User Not Found</div></div>
          <div class="error-card"><div class="code error">500</div><div class="msg">Server Error - Internal Error</div></div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer>
        <p>Built with ❤️ using Node.js, Express.js & MongoDB &nbsp;|&nbsp; <a href="https://jwt.io" target="_blank">JWT.io</a> &nbsp;|&nbsp; <a href="https://www.postman.com" target="_blank">Postman</a></p>
      </footer>

    </body>
    </html>
  `);
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
