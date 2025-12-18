const express = require('express');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const serialize = require('serialize-javascript');

const app = express();
app.use(express.json());

/**
 * 1. SQL Injection（模拟）
 * CodeQL 能识别字符串拼接的危险模式
 */
app.get('/user', (req, res) => {
  const name = req.query.name;
  const sql = "SELECT * FROM users WHERE name = '" + name + "'";
  res.send(sql);
});

/**
 * 2. Command Injection
 */
app.get('/ping', (req, res) => {
  const host = req.query.host;
  child_process.exec("ping -c 1 " + host, (err, out) => {
    res.send(out);
  });
});

/**
 * 3. Path Traversal
 */
app.get('/download', (req, res) => {
  const file = req.query.file;
  const filePath = path.join(__dirname, 'files', file);
  res.send(fs.readFileSync(filePath, 'utf8'));
});

/**
 * 4. Insecure Deserialization
 */
app.post('/deserialize', (req, res) => {
  const data = req.body.data;
  const obj = eval('(' + data + ')');
  res.json(obj);
});

/**
 * 5. XSS
 */
app.get('/xss', (req, res) => {
  res.send("<h1>Hello " + req.query.name + "</h1>");
});

/**
 * 6. 使用危险库函数
 */
app.get('/serialize', (req, res) => {
  const input = req.query.input;
  const result = serialize(input);
  res.send(result);
});

/**
 * 7. 明文敏感信息
 */
app.get('/config', (req, res) => {
  res.json({
    dbPassword: "P@ssw0rd123",
    apiKey: "AKIA_TEST_SECRET"
  });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
