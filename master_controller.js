const { execSync } = require('child_process');
const fs = require('fs-extra');

async function runMasterCycle() {
    const isAutopilot = process.argv.includes('--autopilot');
    
    console.log("🚀 [ANTIGRAVITY MASTER CYCLE] 하이퍼 자동화 루프 가동 시작...");
    const startTime = Date.now();

    const engines = [
        { name: "System AI (Adaptive Thresholds)", cmd: "node system_ai_adaptive_thresholds.js" },
        { name: "System Y (Self-Healing)", cmd: "node system_y_self_heal.js" },
        { name: "System Q (Deadline Predict)", cmd: "node system_q_deadline_predict.js" },
        { name: "System R (Env Risk)", cmd: "node system_r_env_risk.js" },
        { name: "System W (Resource Scaler)", cmd: "node system_w_resource_scaler.js" },
        { name: "System AG (Resource Balancer)", cmd: "node system_ag_balancer.js" },
        { name: "System C (Organizer)", cmd: "node system_c_advanced.js" },
        { name: "System E (Finance)", cmd: "node system_e_financial.js" },
        { name: "System AB (Predictive Audit)", cmd: "node system_ab_auditor.js" },
        { name: "System G (Personnel)", cmd: "node system_g_personnel.js" },
        { name: "System H (Security)", cmd: "node system_h_security.js" },
        { name: "System J (Personnel Risk)", cmd: "node system_j_personnel_risk.js" },
        { name: "System K (Security Predict)", cmd: "node system_k_security_predict.js" },
        { name: "System Z (Security Sentinel)", cmd: "node system_z_security_sentinel.js" },
        { name: "System M (Optimization)", cmd: "node system_m_optimization.js" },
        { name: "System AD (Recursive Opt)", cmd: "node system_ad_recursive_opt.js" },
        { name: "System AN (Risk Forecaster)", cmd: "node system_an_risk_forecast.js" },
        { name: "System L (Decision Support)", cmd: "node system_l_decision_support.js" },
        { name: "System AJ (Impact Simulator)", cmd: "node system_aj_impact_sim.js" },
        { name: "System AK (Anomaly Predictor)", cmd: "node system_ak_anomaly_predict.js" },
        { name: "System S (Action Dispatch)", cmd: "node system_s_action_dispatch.js" },
        { name: "System X (Order Gen)", cmd: "node system_x_order_gen.js" },
        { name: "System AF (Policy Auditor)", cmd: "node system_af_policy_auditor.js" },
        { name: "System AP (Meta-Cognitive Auditor)", cmd: "node system_ap_meta_auditor.js" },
        { name: "System AL (Policy Generator)", cmd: "node system_al_policy_gen.js" },
        { name: "System AR (Ethical Guardian)", cmd: "node system_ar_ethical_guardian.js" },
        { name: "System T (Self-Correction)", cmd: "node system_t_self_correct.js" },
        { name: "System N (Decision Audit)", cmd: "node system_n_decision_audit.js" },
        { name: "System O (Executive)", cmd: "node system_o_executive.js" },
        { name: "System U (Self-Learning)", cmd: "node system_u_learning.js" },
        { name: "System AS (Knowledge Graph)", cmd: "node system_as_knowledge_graph.js" },
        { name: "System AT (Predictive Budgeting)", cmd: "node system_at_predictive_budgeting.js" },
        { name: "System AU (Scenario Planner)", cmd: "node system_au_scenario_planner.js" },
        { name: "System AQ (External Gateway)", cmd: "node system_aq_external_gateway.js" },
        { name: "System V (Knowledge Update)", cmd: "node system_v_knowledge.js" },
        { name: "Master Indexer", cmd: "node master_indexer.js" },
        { name: "Archive Updater", cmd: "node master_archive_updater.js" },
        { name: "System AA (Photo Sync)", cmd: "node system_aa_photo_sync.js" },
        { name: "System A (Report)", cmd: "node system_a_report.js" },
        { name: "System AO (Auto-Summarizer)", cmd: "node system_ao_daily_summary.js" },
        { name: "System F (Drafter)", cmd: "node system_f_drafter.js" },
        { name: "System D (Aggregator)", cmd: "node system_d_pdf_aggregator.js" },
        { name: "System AE (Sentiment Analysis)", cmd: "node system_ae_sentiment.js" },
        { name: "System AC (Context Memory)", cmd: "node system_ac_memory.js" },
        { name: "System AH (Consistency Checker)", cmd: "node system_ah_consistency.js" },
        { name: "System AM (Session Optimizer)", cmd: "node system_am_session_opt.js" }
    ];

    for (const engine of engines) {
        process.stdout.write(`⚙️  Running ${engine.name}... `);
        try {
            execSync(engine.cmd, { stdio: 'ignore' });
            console.log("✅ OK");
        } catch (e) {
            console.log("❌ FAIL");
            console.error(`  ㄴ Error in ${engine.name}: ${e.message}`);
        }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✨ [CYCLE COMPLETE] 모든 엔진이 성공적으로 가동되었습니다. (소요시간: ${duration}s)`);
    console.log("📊 대시보드 및 마스터 아카이브가 최신 데이터로 갱신되었습니다.");

    if (isAutopilot) {
        console.log("\n⏳ Autopilot 활성화: 5분 후 다음 사이클이 시작됩니다...");
        setTimeout(runMasterCycle, 5 * 60 * 1000);
    }
}

runMasterCycle();
