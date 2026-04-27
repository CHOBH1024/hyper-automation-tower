const fs = require('fs-extra');
const path = require('path');

async function updateArchive() {
    console.log("📦 [ARCHIVE] 전사적 통합 아카이브 갱신 중...");
    
    const indexPath = 'GeneralAffairs_Master/master_index.json';
    const archivePath = 'GeneralAffairs_Master/master_archive.json';
    
    if (!fs.existsSync(indexPath)) return;

    const indexData = fs.readJsonSync(indexPath);
    let archiveData = [];
    
    if (fs.existsSync(archivePath)) {
        archiveData = fs.readJsonSync(archivePath);
    }
    
    // 현재 인덱스를 아카이브에 추가 (최대 100개 세션 보관)
    archiveData.push({
        session_id: Date.now(),
        ...indexData
    });
    
    if (archiveData.length > 100) archiveData.shift();

    fs.writeJsonSync(archivePath, archiveData, { spaces: 2 });
    console.log(`✅ 아카이브 완료: 현재 총 ${archiveData.length}개의 세션 데이터가 보관되어 있습니다.`);
}

updateArchive();
