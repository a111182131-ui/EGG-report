/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, Coffee, Mountain, Code, PenTool,
  Heart, Smile, Mail, Instagram, ArrowDownCircle,
  MapPin, Link as LinkIcon, Github
} from 'lucide-react';

const profileData = {
  name: "宇恩 (Ethan)",
  age: 26,
  gender: "男生",
  photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
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
];

const tabs = [
  { id: 'all', label: '🌟 全部' },
  { id: 'interest', label: '🎨 我的興趣' },
  { id: 'career', label: '💼 我的事業' },
] as const;

type FilterType = typeof tabs[number]['id'];

export default function App() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredItems = contentItems.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter || (filter === 'all' && item.category === 'about');
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
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-full blur-lg opacity-40 scale-110"></div>
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
                className={`bg-white p-6 rounded-[32px] border border-[#EBE3D5] hover:border-[#8BA888] transition-colors cursor-default group`}
              >
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:-translate-y-1 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#5A544E]">{item.title}</h3>
                <p className="text-[#827A71] leading-relaxed text-sm">
                  {item.desc}
                </p>
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
