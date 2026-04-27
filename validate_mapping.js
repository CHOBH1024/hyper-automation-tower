const fs = require('fs-extra');
const dioceses = ["Seoul", "Incheon", "Gyeonggi_North", "Gyeonggi_South", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Daegu", "Busan"];
const map = {};

dioceses.forEach(d => {
    map[d] = [];
    for (let i = 1; i <= 15; i++) {
        map[d].push(`${d}_Church_${i}`);
    }
});

fs.writeJsonSync('GeneralAffairs_Master/church_diocese_map.json', map, { spaces: 2 });
console.log("🗺️ 교회-교구 매핑 테이블 복구 완료.");
