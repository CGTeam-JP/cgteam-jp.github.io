

//fade efect-------------------------------------------------------------------------------
const items = document.querySelectorAll('.fade-on-scroll');
function checkVisibility() {
    const viewportHeight = window.innerHeight;
    items.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementHeight = rect.height;
        const visiblePx = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const requiredForElement = elementHeight * 1;
        const requiredForViewport = viewportHeight * 0.5;
        const requiredVisiblePx = Math.min(requiredForElement, requiredForViewport);
        if (visiblePx >= requiredVisiblePx) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    });
}
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);
checkVisibility();

//role roulette------------------------------------------------------------------------------
const roles = document.querySelectorAll('.role');
const drumroll = new Audio('assets/audio/drum.mp3');
const pingsound = new Audio('assets/audio/ping.mp3');
const selectedRoleDisplay = document.getElementById('selected-role');
const randomizeRoleBtn = document.getElementById('randomize-btn');
const roleDescription = document.querySelector('.role-description');
let selectedRole = null;
let isRandomizing = false;

const roleDescriptions = {
  "ゲームプログラマー": "ゲームプログラマーは、ゲームの動作やルール、物理演算、AI、UIなどをプログラミングで実装する技術者です。C#、C++、Pythonなどの言語を使用して、エンジンやツールを扱いながら、開発チームのアイデアを実際の動くゲームへと変えていきます。例えば、キャラクターの動きや敵の行動パターン、カメラの制御、ネットワーク通信などを担当します。",
  "ゲームディレクター": "ゲームディレクターは、開発チーム全体を指揮し、ゲームの方向性や世界観、完成度を決定するリーダーです。全ての部署と連携し、スケジュール管理、品質チェック、コンセプトの維持を行います。例えば、ゲームのテーマを決めたり、最終的なゲームバランスや演出を確認して『このゲームらしさ』を保つ役割を担います。",
  "レベルデザイナー": "レベルデザイナーは、ゲーム内のマップやステージ構成を設計し、プレイヤー体験を作り出す職種です。敵の配置、アイテムの配置、進行ルート、難易度調整などを行います。例えば、アクションゲームでジャンプのタイミングを考えたり、RPGで探索が楽しくなるようなマップ構造を作ることが仕事です。",
  "ゲームプランナー": "ゲームプランナーは、ゲームの基本的な企画・仕様を考える職種です。どんなルールにするか、プレイヤーがどう楽しむか、報酬システムや難易度をどう設計するかを決めます。例えば、新しいイベントやクエストの内容を提案したり、ゲームバランスを調整してプレイヤーが飽きないように工夫します。",
  "ストーリーライター": "ストーリーライターは、ゲームの世界観、登場人物、ストーリー展開、セリフなどを執筆する役割です。感情を動かすドラマや、プレイヤーが没入できる物語を作り出します。例えば、RPGのクエストラインを書いたり、キャラクターの性格や背景を作ることで、ゲームに深みを与えます。",
  "UIデザイナー": "UIデザイナーは、プレイヤーが操作するインターフェース（メニュー、ボタン、HUDなど）を設計します。見やすく、使いやすく、そしてゲームの世界観に合ったデザインを作ることが求められます。例えば、HPバーやインベントリ画面のデザイン、タッチ操作ゲームのボタン配置などを担当します。",
  "アートデザイナー": "アートデザイナーは、キャラクター、背景、アイテムなどゲーム内で使用されるビジュアル素材を制作します。ゲーム全体の美術スタイルを統一し、世界観を視覚的に表現します。例えば、ファンタジー世界の城や森、SFゲームのメカデザインなどを描く仕事です。",
  "VFXアーティスト": "VFXアーティストは、爆発、魔法、炎、煙、光のエフェクトなど、ゲームに臨場感や迫力を与える視覚効果を作成します。エンジンのパーティクルシステムを使用して、アクションの手応えを高めます。例えば、魔法を放つ瞬間の光や、ボス撃破時のエフェクトを制作します。",
  "3Dアニメーター": "3Dアニメーターは、3Dモデルに動きを与えるアーティストです。モーションキャプチャや手付けアニメーションを使い、キャラクターやモンスターの自然な動きを作ります。例えば、走る、攻撃する、話すなどのアクションを表現します。リアルさと感情表現が求められる職種です。",
  "2Dアニメーター": "2Dアニメーターは、2DキャラクターやUI、演出カットなどのアニメーションを作ります。スプライトアニメーションやリギングツールを用いて、滑らかで魅力的な動きを表現します。例えば、スマホゲームでのキャラクターの笑顔や、攻撃時のエフェクト動作などを担当します。",
  "SEアーティスト": "SEアーティスト（サウンドエフェクトアーティスト）は、ゲーム内の効果音を制作します。攻撃音、環境音、UIクリック音など、プレイヤーの体験を支える音作りを行います。例えば、剣の斬撃音や、ドアを開ける音、魔法の詠唱音などをデザインします。",
  "音楽コンポーザー": "音楽コンポーザーは、ゲームの世界を彩る音楽を作曲します。感情やテンションを演出し、場面に合わせたBGMを制作します。例えば、バトル中の緊迫した曲、街の穏やかなテーマ、感動のエンディングソングなどを担当します。",
  "サウンドディレクター": "サウンドディレクターは、ゲーム全体の音の品質とバランスを監督する役職です。効果音・音楽・ボイスの調整を行い、没入感を最大化します。例えば、ボイスとBGMの音量バランスを整えたり、音がプレイヤー体験を妨げないように設計します。",
  "その他": "その他の役職には、プロデューサー、QAテスター、ツールエンジニア、モーションキャプチャー技術者など、多岐にわたる専門分野があります。それぞれがチームを支え、完成度の高いゲームを作るために重要な役割を果たします。"
};


roles.forEach(role => {
  role.addEventListener('click', () => {
    if (isRandomizing) return;
    setHighlight(role);
    setSelected(role);
    drumroll.currentTime = 0;
    drumroll.play();
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.role') && !isRandomizing) clearHighlight();
});

randomizeRoleBtn.addEventListener('click', () => {
  if (isRandomizing) return;
  isRandomizing = true;
  clearHighlight();
  randomizeRoleBtn.disabled = true;
  randomizeRoleBtn.textContent = '。。。';

  let index = 0;
  const cycleSpeed = 50;
  const totalCycles = Math.floor(Math.random() * 30) + 30;
  let cycleCount = 0;

  const interval = setInterval(() => {
    clearHighlight();
    roles[index].classList.add('highlight');
    index = (index + 1) % roles.length;
    cycleCount++;
    drumroll.currentTime = 0;
    drumroll.play();

    const remaining = totalCycles - cycleCount;
    const randomSlowDownPoint = 7 + Math.floor(Math.random() * 6);

    if (remaining <= randomSlowDownPoint && cycleCount < totalCycles) {
      clearInterval(interval);
      slowDownCycle(index, cycleCount, randomSlowDownPoint);
    }
    if (cycleCount >= totalCycles) {
      clearInterval(interval);
      finish(index);
    }
  }, cycleSpeed);

  function slowDownCycle(index, count, remaining) {
    let delay = 60;
    function slowStep() {
      clearHighlight();
      roles[index].classList.add('highlight');
      index = (index + 1) % roles.length;
      count++;
      drumroll.currentTime = 0;
      drumroll.play();
      remaining--;
      delay += 50;
      if (remaining > 0) setTimeout(slowStep, delay);
      else finish(index);
    }
    setTimeout(slowStep, delay);
  }

  function finish(index) {
    const finalIndex = (index - 1 + roles.length) % roles.length;
    clearHighlight();
    roles[finalIndex].classList.add('highlight');
    setSelected(roles[finalIndex]);
    isRandomizing = false;
    randomizeRoleBtn.disabled = false;
    randomizeRoleBtn.textContent = 'ランダム';
    pingsound.currentTime = 0;
    pingsound.play();
  }
});

function clearHighlight() {
  roles.forEach(r => r.classList.remove('highlight'));
}

function setHighlight(role) {
  clearHighlight();
  role.classList.add('highlight');
}

function setSelected(role) {
  if (selectedRole) selectedRole.classList.remove('selected');
  selectedRole = role;
  selectedRole.classList.add('selected');
  const name = role.dataset.name;
  selectedRoleDisplay.textContent = `Selected Role: ${name}`;
  if (roleDescription) {
    roleDescription.textContent = roleDescriptions[name] || "説明がまだありません。";
  }
}

const header = document.getElementById("header");
function checkScrollHeader() {
  if (window.scrollY > 0) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
window.addEventListener("scroll", checkScrollHeader);
checkScrollHeader();
