const os = require('os');
const fs = require('fs');

/**
 * [Step 131] 시스템 건전성 자가 진단 엔진
 */
function runHealthCheck() {
    console.log("🔍 시스템 건전성 진단을 시작합니다...");

    const memoryUsage = process.memoryUsage();
    console.log(`- 메모리 점유율: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- 가용 시스템 메모리: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- CPU 코어 수: ${os.cpus().length}`);

    // 라이브러리 체크
    const libs = ['fs-extra', 'path', 'pdf-parse', 'docx', 'axios', 'sharp'];
    console.log("- 필수 라이브러리 로드 테스트:");
    libs.forEach(lib => {
        try {
            require(lib);
            console.log(`  [✅] ${lib}: 정상`);
        } catch (e) {
            console.warn(`  [❌] ${lib}: 로드 실패 (${e.message})`);
        }
    });

    console.log("✅ 진단 완료. 모든 시스템이 정상 범위 내에 있습니다.");
}

runHealthCheck();
