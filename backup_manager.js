const fs = require('fs-extra');
const path = require('path');

async function runBackup() {
    console.log("💾 중요 데이터 자율 백업 시작...");
    const backupDir = 'GeneralAffairs_Master/06_Archives/Backups';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const targetFiles = [
        'GeneralAffairs_Master/master_index.json',
        'GeneralAffairs_Master/04_Personnel/leaders_db.json'
    ];

    await fs.ensureDir(backupDir);

    targetFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const fileName = path.basename(file, '.json');
            const dest = path.join(backupDir, `${fileName}_${timestamp}.json`);
            fs.copySync(file, dest);
            console.log(`- 백업 완료: ${path.basename(dest)}`);
        }
    });
    console.log("✅ 모든 중요 데이터가 안전하게 아카이빙되었습니다.");
}

runBackup();
