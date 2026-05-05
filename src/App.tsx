/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, Coffee, Mountain, Code, PenTool,
  Heart, Smile, Mail, Instagram, ArrowDownCircle,
  MapPin, Link as LinkIcon, Github, Play, Video
} from 'lucide-react';

const profileData = {
  name: "宇恩 (Ethan)",
  age: 26,
  gender: "男生",
  photo: "/IMG_1371.JPG",
  shortIntro: "熱愛生活與挑戰，隨時準備迎接下一場冒險！🌍"
};

const contentItems = [
  { id: 'p1', category: 'about', title: '我的個性', desc: '十足的陽光男孩 ☀️！充滿好奇心、幽默風趣，在群體中常常是帶動氣氛的角色，非常喜歡結交新朋友，聽聽別人的故事。', icon: <Smile className="w-8 h-8 text-[#D97D54]" />, color: 'bg-[#FDF2F0]' },
  { id: 'h1', category: 'about', title: '健康狀況', desc: '頭好壯壯，身心靈狀態極佳 💪！每週固定到健身房重訓三次，週末偶爾也會去河濱跑步，非常享受大汗淋漓的滿滿活力。', icon: <Heart className="w-8 h-8 text-[#D97D54]" />, color: 'bg-[#FDF2F0]' },
  { id: 'i1', category: 'interest', title: '光影捕捉手', desc: '業餘攝影愛好者 📸，假日總是帶著底片相機穿梭在城市巷弄，最喜歡紀錄人與人之間互動的純粹瞬間與夕陽下的金黃時刻。', icon: <Camera className="w-8 h-8 text-[#8BA888]" />, color: 'bg-[#F0FDF4]' },
  { id: 'i2', category: 'interest', title: '假日手沖師', desc: '每天早晨最重要的儀式感 ☕。喜歡研究不同產地豆子的風味、嘗試各種沖煮參數，目標是能為朋友們沖出一杯讓他們驚豔的好咖啡！', icon: <Coffee className="w-8 h-8 text-[#5A544E]" />, color: 'bg-[#FDF9F0]' },
  { id: 'i3', category: 'interest', title: '山林探險家', desc: '深愛大自然的寧靜與壯麗 ⛰️。目前正熱衷於收集台灣百岳，登山不僅是挑戰體能極限，更是與自己對話、沉澱心靈的最佳時刻。', icon: <Mountain className="w-8 h-8 text-[#8BA888]" />, color: 'bg-[#F0FDF4]' },
  { id: 'c1', category: 'career', title: '前端魔法師', desc: '目前擔任前端工程師 💻，專注於打造流暢且極具美感的使用者體驗。享受將設計師天馬行空的稿件轉化為現實的成就感，是個熱愛 Code 的怪胎。', icon: <Code className="w-8 h-8 text-[#5A544E]" />, color: 'bg-[#F0F7FD]' },
  { id: 'c2', category: 'career', title: '斜槓創作者', desc: '除了寫程式，也在社群媒體經營個人品牌 🚀。撰寫技術教學文章、分享職場生存法則，幫助新手少走彎路，期望發揮正面的影響力。', icon: <PenTool className="w-8 h-8 text-[#D97D54]" />, color: 'bg-[#FDF2F0]' },
  
  // Video Items
  { 
    id: 'v1', 
    category: 'vlog', 
    title: '台南出發：高鐵旅程', 
    desc: '搭乘高鐵前往台南站，感受充滿期待的旅程起點。', 
    videoUrl: '/vlog1.mp4',
    icon: <Video className="w-8 h-8 text-[#8BA888]" />, 
    color: 'bg-[#F0FDF4]' 
  },
  { 
    id: 'v2', 
    category: 'vlog', 
    title: '果貿社區：寬來順早餐', 
    desc: '在圓環建築中品嚐道地早餐，感受高雄眷村的日常魅力。', 
    videoUrl: '/vlog2.mp4',
    icon: <Video className="w-8 h-8 text-[#D97D54]" />, 
    color: 'bg-[#FDF2F0]' 
  },
  { 
    id: 'v3', 
    category: 'vlog', 
    title: '排隊名店：興隆居早餐', 
    desc: '必吃的噴汁湯包與經典燒餅，早晨的排隊也變得值得。', 
    videoUrl: '/vlog3.mp4',
    icon: <Video className="w-8 h-8 text-[#5A544E]" />, 
    color: 'bg-[#FDF9F0]' 
  },
  { 
    id: 'v4', 
    category: 'vlog', 
    title: '藝術洗禮：奇美博物館', 
    desc: '參觀豐富的常設展，在國際級的展覽空間中流連忘返。', 
    videoUrl: '/vlog4.mp4',
    icon: <Video className="w-8 h-8 text-[#D97D54]" />, 
    color: 'bg-[#FDF2F0]' 
  },
];

const tabs = [
  { id: 'all', label: '🌟 全部' },
  { id: 'interest', label: '🎨 興趣愛好' },
  { id: 'career', label: '💼 事業發展' },
  { id: 'vlog', label: '🎬 影音記錄' },
] as const;

type FilterType = typeof tabs[number]['id'];

export default function App() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredItems = contentItems.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const scrollToContent = () => {
    const el = document.getElementById('content-section');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A443F] font-sans overflow-x-hidden selection:bg-[#EBE3D5]">
      
      {/* Navigation */}
      <nav className="px-6 py-6 md:px-12 flex justify-between items-center bg-transparent relative z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8BA888] rounded-full flex items-center justify-center text-white font-bold text-xl">
            {profileData.name.charAt(0)}
          </div>
          <span className="text-xl font-bold tracking-tight text-[#5A544E]">
            {profileData.name.toUpperCase()}'S SPACE
          </span>
        </div>
        <button 
          onClick={scrollToContent}
          className="hidden sm:block px-6 py-2 bg-[#D97D54] text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-sm"
        >
          我想了解更多
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#8BA888] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#D97D54] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#EBE3D5] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-10 flex flex-col items-center text-center mt-10"
        >
          {/* Photo */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D97D54] to-[#8BA888] rounded-full blur-lg opacity-40 scale-110"></div>
            <img 
              src={profileData.photo} 
              alt={profileData.name} 
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full border-4 border-white shadow-xl relative z-10"
            />
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-lg border border-[#EBE3D5] z-20 font-bold text-[#8BA888] text-sm transform rotate-12"
            >
              Hi There! 👋
            </motion.div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#5A544E] mb-4 tracking-tight">
            我是 <span className="text-[#D97D54]">{profileData.name}</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-5 py-2 bg-[#F5F1EB] rounded-lg text-[#8BA888] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              🎂 {profileData.age} 歲
            </span>
            <span className="px-5 py-2 bg-[#F5F1EB] rounded-lg text-[#8BA888] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              🧑🏼 {profileData.gender}
            </span>
            <span className="px-5 py-2 bg-[#F5F1EB] rounded-lg text-[#8BA888] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D97D54]" /> 台北, 台灣
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#827A71] font-medium max-w-lg leading-relaxed mb-10">
            {profileData.shortIntro}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContent}
            className="group flex flex-col items-center gap-2 text-[#D97D54] font-bold text-lg"
          >
            <div className="bg-[#D97D54] text-white px-8 py-3 rounded-full shadow-sm hover:opacity-90 flex items-center gap-2 transition-all">
              我想了解更多
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mt-6 text-[#8BA888]"
            >
              <ArrowDownCircle className="w-8 h-8 opacity-70" />
            </motion.div>
          </motion.button>
        </motion.div>
      </section>

      {/* Content Section */}
      <section id="content-section" className="py-24 px-6 max-w-6xl mx-auto relative z-20">
        
        {/* Filter Tabs */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-[#EBE3D5] p-1.5 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-6 py-2.5 rounded-xl text-base md:text-lg transition-colors ${
                  filter === tab.id ? 'text-[#5A544E] font-bold' : 'text-[#827A71] font-semibold hover:bg-white/50'
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-sm rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                key={item.id}
                className={`flex flex-col bg-white rounded-[32px] border border-[#EBE3D5] hover:border-[#8BA888] transition-colors overflow-hidden group shadow-sm`}
              >
                {/* Video Check */}
                {'videoUrl' in item ? (
                  <div className="w-full aspect-video bg-black relative">
                    <video 
                      src={item.videoUrl} 
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                    />
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                       <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                        {item.icon}
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:-translate-y-1 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-[#5A544E]">{item.title}</h3>
                  <p className="text-[#827A71] leading-relaxed text-sm mb-4">
                    {item.desc}
                  </p>
                  {'videoUrl' in item && (
                    <div className="mt-auto pt-4 border-t border-[#F2EDE4] flex items-center gap-2 text-[#8BA888] text-xs font-bold uppercase tracking-widest">
                      <Play className="w-4 h-4" /> 影音遊記
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="text-center py-20 text-[#A69D94] text-lg"
           >
             這個探索分類好像沒有內容喔... 🧐
           </motion.div>
        )}

      </section>

      {/* Autobiography Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-white rounded-[40px] p-8 md:p-16 shadow-xl shadow-[#8b888815] border border-[#EBE3D5] relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDF9F0] rounded-bl-[100px] -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-1 bg-[#D97D54] rounded-full"></div>
              <h2 className="text-3xl font-bold text-[#5A544E] tracking-tight">我的生命故事</h2>
            </div>

            <div className="space-y-12">
              {/* Part 1 */}
              <div className="relative pl-8 border-l-2 border-[#EBE3D5]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8BA888] shadow-sm"></div>
                <h3 className="text-xl font-bold text-[#5A544E] mb-4">🌱 自律與好奇心的萌芽</h3>
                <p className="text-[#827A71] leading-relaxed text-lg italic">
                  「我成長在一個平凡但充滿支持的家庭。父母雖然沒有給我優渥的物質條件，卻給了我最寶貴的財富：『對世界的好奇心』和對『目標的堅持』。在我的成長過程中，父母便鼓勵我嘗試各類課外活動，從繪畫、田徑到鋼琴中，我學會了基於興趣的自主學習，也明白任何成果都需要時間的沉澱。這種環境養成了我早起規劃行程、不輕易言棄的性格，以此自律成為我面對高壓環境時最堅實的後盾。」
                </p>
              </div>

              {/* Part 2 */}
              <div className="relative pl-8 border-l-2 border-[#EBE3D5]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#D97D54] shadow-sm"></div>
                <h3 className="text-xl font-bold text-[#5A544E] mb-4">🌉 從理論到實踐的跨越</h3>
                <p className="text-[#827A71] leading-relaxed text-lg italic">
                  「進入學業成長的關鍵時期，是我思維轉變最鮮明的階段。我專注於前端開發與使用者體驗設計，在鑽研技術知識的同時，我意識到『空談無補』。為了驗證所學，我積極參與各種開源專案與競賽。 最令我印象深刻的是在一次大型開發實習中，我擔任前端開發領隊一職。我們遇到了技術架構挑戰與時程壓力，我主動站出來分析現狀，運用邏輯分析與團隊協調重新分配任務。」
                </p>
              </div>

              {/* Part 3 */}
              <div className="relative pl-8 border-l-2 border-[#EBE3D5]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8BA888] shadow-sm"></div>
                <h3 className="text-xl font-bold text-[#5A544E] mb-4">🌋 挫折是成長的回饋</h3>
                <p className="text-[#827A71] leading-relaxed text-lg italic">
                  「這次經驗我深刻地體會到：真正的成長並不讓迴避問題，而著眼於如何在高壓下保持理智並解決問題。 人生描述並不總是坦途，在（一個具體的掙扎，如：考場失利、求職碰壁、專案失敗）時，我曾經一度懷疑自己的能力。然而，我卻無意間沉溺於低潮，而是選擇『覆盤』。我分析出失敗的主要原因是（原因），並制定了（重新規劃）。我學會將罷工視為一種『市場回饋』，調整腳步後重新出發。這也讓我後來在工作或學習中，具備了更強的抗壓性與素質心理，能夠以更寬廣的格局看待眼前的得失。」
                </p>
              </div>

              {/* Part 4 */}
              <div className="relative pl-8 border-l-2 border-[#EBE3D5]">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#5A544E] shadow-sm"></div>
                <h3 className="text-xl font-bold text-[#5A544E] mb-4">🚀 創造與自我進化</h3>
                <p className="text-[#827A71] leading-relaxed text-lg italic">
                  「回顧成長歷程，我發現自己始終在追求『更好的解決方案』。我不僅希望能夠完美達成被交辦的任務，更期許自己能夠成為一個『價值的創造者』。展望未來，我希望能在數位科技領域深耕，發揮我細心敏銳與執行力強的優勢。我確信，累積的種種經驗已化為我的養分，讓我能以謙卑但自信的姿態，迎接下一個階段的挑戰，為團隊與社會貢獻一己之力。」
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer / Contact Section */}
      <footer className="mt-12 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 relative overflow-hidden">
        <div className="bg-[#5A544E] rounded-[32px] px-8 py-16 text-center text-white shadow-lg relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]"></div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-4 tracking-wide">想互相認識交流嗎？</h2>
            <p className="text-[#EBE3D5] text-sm md:text-base mb-10 opacity-90 leading-relaxed">
              無論是寫程式的坑、手沖咖啡的豆子，或是下週要去哪座百岳...<br className="hidden sm:block" />
              歡迎透過以下實體或虛擬的方式聯絡我！
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-colors font-medium text-sm">
                <Mail className="w-5 h-5" />
                hi@ethan.jay
              </a>
              <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-colors font-medium text-sm">
                <Instagram className="w-5 h-5" />
                @ethan_daily
              </a>
              <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-colors font-medium text-sm">
                <Github className="w-5 h-5" />
                ethanui
              </a>
            </div>
            
            <div className="mt-16 text-xs text-[#A69D94] uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} Ethan Jay • Crafted with ❤️ & ☕
            </div>
          </motion.div>
        </div>
      </footer>

    </div>
  );
}
