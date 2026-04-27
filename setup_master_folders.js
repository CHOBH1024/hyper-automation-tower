const fs = require('fs-extra');
const path = require('path');

const masterPath = 'GeneralAffairs_Master';
const dioceses = ["Seoul", "Incheon", "Gyeonggi_North", "Gyeonggi_South", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Daegu", "Busan"];
const depts = ["GeneralAffairs", "Finance", "Mission", "Education", "External", "Culture", "Youth"];

async function setup() {
    await fs.ensureDir(path.join(masterPath, '01_Dioceses'));
    await fs.ensureDir(path.join(masterPath, '02_Departments'));
    await fs.ensureDir(path.join(masterPath, '03_Finance'));
    await fs.ensureDir(path.join(masterPath, '04_Personnel'));
    await fs.ensureDir(path.join(masterPath, '05_Security'));
    await fs.ensureDir(path.join(masterPath, '06_Archives'));
    
    for (const d of dioceses) {
        await fs.ensureDir(path.join(masterPath, '01_Dioceses', d));
        await fs.ensureDir(path.join(masterPath, '01_Dioceses', d, '2026_Reports'));
    }
    console.log("🏙️ 총무국 마스터 인프라 재건 완료.");
}
setup();
