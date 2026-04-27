const sharp = require('sharp');
const fs = require('fs-extra');

async function testImageProcessing() {
    console.log("🖼️ 이미지 최적화 엔진(sharp) 테스트를 시작합니다...");
    
    // 테스트용 빈 이미지 생성 (빨간색 100x100)
    const testImgPath = 'test_input.png';
    const outputImgPath = 'test_output.webp';
    
    try {
        await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 1 }
            }
        })
        .webp({ quality: 80 })
        .toFile(outputImgPath);
        
        console.log("✅ 이미지 최적화 성공: test_output.webp 생성됨.");
        fs.removeSync(testImgPath);
    } catch (e) {
        console.warn("⚠️ 이미지 처리 라이브러리 오류 (환경에 따라 다를 수 있음):", e.message);
    }
}

testImageProcessing();
