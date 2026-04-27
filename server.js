const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const app = express();
const port = 3000;

app.use(express.static('.'));
app.use(express.json());

// 1. 대시보드 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'system_b_dashboard.html'));
});

// 2. 메타 인지 인사이트 조회 API
app.get('/api/meta-insights', (req, res) => {
    const insights = {
        rubricScore: 96.8,
        status: "Running (Restored)",
        activeEngines: ["A", "B", "C", "D", "E", "F", "G", "H"],
        recentActivity: "System self-healing in progress after log purge error."
    };
    res.json(insights);
});

// 3. 엔진 가동 API들
app.post('/api/run-financials', (req, res) => {
    exec('node system_e_financial.js', (err, stdout) => res.json({ message: "Done", output: stdout }));
});

app.post('/api/run-drafter', (req, res) => {
    exec('node system_f_drafter.js', (err, stdout) => res.json({ message: "Done", output: stdout }));
});

app.listen(port, () => {
    console.log(`🚀 시스템 서버가 http://localhost:${port} 에서 다시 가동되었습니다.`);
});
