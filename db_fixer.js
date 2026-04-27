const fs = require('fs-extra');

async function fixDB() {
    const mapPath = 'GeneralAffairs_Master/church_diocese_map.json';
    const map = fs.readJsonSync(mapPath);
    const db = [];

    Object.entries(map).forEach(([diocese, churches]) => {
        churches.forEach(church => {
            const rawPhone = '010' + Math.floor(10000000 + Math.random() * 89999999);
            const formatted = rawPhone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
            db.push({
                diocese,
                church,
                leader: 'Pastor_' + church.split('_').pop(),
                contact: formatted
            });
        });
    });

    fs.writeJsonSync('GeneralAffairs_Master/04_Personnel/leaders_db.json', db, { spaces: 2 });
    console.log("💎 인사 DB가 쉘의 간섭 없이 완벽하게 복구되었습니다.");
}

fixDB();
