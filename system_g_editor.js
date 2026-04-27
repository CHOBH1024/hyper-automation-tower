const fs = require('fs-extra');
const path = require('path');

const DB_PATH = 'GeneralAffairs_Master/04_Personnel/leaders_db.json';

async function editData() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: node system_g_editor.js <search_term> <key_to_fix> <new_value> [--dry-run]");
        console.log("   OR: node system_g_editor.js --file <bulk_json_path> [--dry-run]");
        console.log("   OR: node system_g_editor.js --rollback");
        return;
    }

    const isDryRun = args.includes('--dry-run');
    const isFileMode = args.includes('--file');
    const isRollback = args.includes('--rollback');
    const params = args.filter(a => a !== '--dry-run' && a !== '--file' && a !== '--rollback');
    const [searchTerm, key, newValue] = params;
    
    if (!fs.existsSync(DB_PATH)) return console.log("❌ DB 파일을 찾을 수 없습니다.");

    // [Step 380] 롤백 로직
    if (isRollback) {
        const dir = path.dirname(DB_PATH);
        const backups = fs.readdirSync(dir).filter(f => f.includes('leaders_db_backup_')).sort().reverse();
        if (backups.length === 0) return console.log("ℹ️ 복구할 백업 파일이 없습니다.");
        
        const latestBackup = path.join(dir, backups[0]);
        fs.copySync(latestBackup, DB_PATH);
        console.log(`🔙 [ROLLBACK] 최신 백업으로 복구 완료: ${backups[0]}`);
        return;
    }

    // [Step 374] 수정 전 자동 백업 생성
    const backupPath = DB_PATH.replace('.json', `_backup_${Date.now()}.json`);
    fs.copySync(DB_PATH, backupPath);
    console.log(`🛡️ [BACKUP] 원본 데이터가 보호되었습니다: ${path.basename(backupPath)}`);

    // [Step 378] 벌크 처리 로직
    const db = fs.readJsonSync(DB_PATH);
    let updatedCount = 0;

    if (isFileMode) {
        const bulkData = fs.readJsonSync(params[0]);
        bulkData.forEach(change => {
            db.leaders.forEach(leaderEntry => {
                if (leaderEntry.church === change.church) {
                    leaderEntry[change.key] = change.value;
                    updatedCount++;
                    console.log(`✅ [BULK] ${leaderEntry.church}: ${change.key} -> ${change.value}`);
                }
            });
        });
    } else {
        const [searchTerm, key, newValue] = params;
        db.leaders.forEach(leaderEntry => {
            if (leaderEntry.church.includes(searchTerm) || leaderEntry.leader.includes(searchTerm)) {
                leaderEntry[key] = newValue;
                updatedCount++;
                console.log(`✅ [FIX] ${leaderEntry.church}: ${key} -> ${newValue}`);
            }
        });
    }

    if (updatedCount > 0) {
        if (isDryRun) {
            console.log(`🧪 [DRY-RUN] 총 ${updatedCount}건의 데이터가 수정될 예정입니다. (저장되지 않음)`);
        } else {
            db.metadata.lastUpdated = new Date().toISOString();
            fs.writeJsonSync(DB_PATH, db, { spaces: 2 });
            console.log(`✨ 총 ${updatedCount}건의 데이터가 성공적으로 수정되었습니다.`);
        }
    } else {
        console.log("ℹ️ 검색어와 일치하는 데이터를 찾지 못했습니다.");
    }
}

editData();
