// Bản dịch nội dung game theo nguyên văn tiếng Việt: vi -> [en, zh].
// Dịch tay theo từng phần; câu chưa có bản dịch sẽ hiển thị tiếng Việt.
export const CONTENT: Record<string, readonly [string, string]> = {
  // Tên cảnh giới
  "Luyện Khí Kỳ": ["Qi Refining Stage", "炼气期"],
  "Trúc Cơ Kỳ": ["Foundation Establishment Stage", "筑基期"],
  "Kim Đan Kỳ": ["Golden Core Stage", "金丹期"],
  "Nguyên Anh Kỳ": ["Nascent Soul Stage", "元婴期"],
  "Hóa Thần Kỳ": ["Spirit Transformation Stage", "化神期"],
  "Luyện Hư Kỳ": ["Void Refining Stage", "炼虚期"],
  "Hợp Thể Kỳ": ["Body Integration Stage", "合体期"],
  "Đại Thừa Kỳ": ["Mahayana Stage", "大乘期"],
  "Độ Kiếp Kỳ": ["Tribulation Transcendence Stage", "渡劫期"],
  "Lạc vào bí cảnh": ["Lost in a Secret Realm", "误入秘境"],

  // ===== Khảo Tâm Ma · Luyện Khí Kỳ =====
  "Vừa bước chân vào con đường tu tiên, cảm nhận linh khí mỏng manh, tâm trí dễ sinh ra ý định gì nhất?": ["Having just set foot on the immortal path and sensing only faint qi, what thought most easily arises in the mind?", "初踏修仙之路，感知灵气稀薄，心中最易生出何种念头？"],
  "Kiên nhẫn đả thông kinh mạch từng bước, hiểu rằng tu hành không thể nóng vội.": ["Patiently open the meridians step by step, knowing cultivation cannot be rushed.", "耐心逐步打通经脉，明白修行急不得。"],
  "Nghi ngờ bản thân thiếu khuyết linh căn, chi bằng chuyển hướng luyện thể để bù đắp.": ["Doubt your spirit root is lacking, and switch to body refining to compensate.", "怀疑自身灵根残缺，不如转修炼体以作弥补。"],
  "Cho rằng phương pháp nạp khí của tông môn có vấn đề, nên tự ý cải biên công pháp.": ["Decide the sect's qi-gathering method is flawed and rewrite the technique yourself.", "认为宗门纳气之法有误，擅自改编功法。"],
  "Tiết kiệm từng chút linh khí, giữ lại dùng dần thay vì mạo hiểm đả thông đại chu thiên.": ["Hoard every wisp of qi for later instead of risking opening the Grand Circulation.", "节省每一丝灵气慢慢使用，而不冒险打通大周天。"],
  "Lần đầu tiên luyện hóa linh thạch thất bại, khí huyết nghịch lưu, đạo hữu nên làm gì?": ["Your first attempt to refine a Spirit Stone fails and your qi and blood flow backward. What should you do?", "初次炼化灵石失败，气血逆流，道友当如何？"],
  "Thu hồi thần thức, tĩnh tọa điều tức để ổn định lại đan điền.": ["Withdraw your divine sense and sit in stillness to stabilise your dantian.", "收回神识，静坐调息以稳固丹田。"],
  "Tăng gấp đôi lượng linh thạch hấp thụ để bù đắp phần hao hụt vừa qua.": ["Double the Spirit Stones you absorb to make up for the loss.", "加倍吸收灵石以弥补刚才的损耗。"],
  "Dùng ngoại lực châm cứu huyệt vị để ép dòng linh lực quay về quỹ đạo.": ["Use acupuncture to force the spiritual power back onto its course.", "借外力针刺穴位，强逼灵力回归正轨。"],
  "Tạm ngưng tu luyện vài năm để cơ thể tự phục hồi nguyên khí hoàn toàn.": ["Stop cultivating for a few years so the body fully restores its vitality.", "暂停修炼数年，让身体自行完全恢复元气。"],
  "Nhìn thấy đồng môn nhập môn cùng lúc đã đột phá tầng tiếp theo, tâm lý xuất hiện sự ghen tị, cách giải quyết?": ["Seeing a fellow disciple who joined with you already break through, envy arises. How do you resolve it?", "见同期入门的同门已突破下一层，心生嫉妒，如何化解？"],
  "Xem đó là động lực để cố gắng, mỗi người có cơ duyên và nhịp điệu riêng.": ["Take it as motivation; everyone has their own fortune and pace.", "视之为努力的动力，每人自有机缘与节奏。"],
  "Cho rằng họ dùng bàng môn tả đạo, cần báo cáo lên chấp pháp đường điều tra.": ["Assume they used heterodox methods and report them to the Law Enforcement Hall.", "认定对方用了旁门左道，须上报执法堂调查。"],
  "Tự cô lập bản thân, tránh xa mọi giao tiếp để không bị ảnh hưởng tâm trạng.": ["Isolate yourself and avoid all contact so your mood is not affected.", "自我孤立，远离一切交往以免心绪受扰。"],
  "Chuyển sang tu luyện ngày đêm không nghỉ để nhanh chóng san lấp khoảng cách.": ["Cultivate day and night without rest to close the gap quickly.", "转而日夜不休地修炼，尽快拉平差距。"],
  "Bế quan suốt mấy tháng nhưng tu vi giậm chân tại chỗ, ảo ảnh cô độc bắt đầu xâm chiếm tâm trí:": ["Months of seclusion yet your cultivation stands still, and visions of loneliness invade your mind:", "闭关数月修为却原地踏步，孤寂幻影开始侵占心神："],
  "Nhìn thấu cô độc là con đường phải trải qua của kẻ mạnh, kiên định đạo tâm.": ["See through loneliness as the road every strong one must walk, and stand firm in your Dao heart.", "看透孤独乃强者必经之路，坚定道心。"],
  "Biện minh rằng đại đạo vô tình nhưng tình người sâu nặng, nên tìm bạn đồng tu để chia sẻ.": ["Reason that the Great Dao is heartless but human bonds run deep, so seek a cultivation partner.", "辩称大道无情而人情深重，应寻道侣分担。"],
  "Tự nhủ cảnh giới này đã là giới hạn của bản thân, an phận thủ thường là thượng sách.": ["Tell yourself this realm is your limit and contentment is the best course.", "自认此境界已是极限，安分守常方为上策。"],
  "Cho rằng thiếu vắng đan dược hỗ trợ nên mới bế tắc, cần mạo hiểm ra ngoại sơn tìm kiếm.": ["Blame the lack of pills for the impasse and venture beyond the mountain to seek them.", "认为缺少丹药才陷入瓶颈，须冒险出山寻找。"],
  "Gặp phải bình phong linh khí, cảm giác như có bức tường vô hình chặn lại không cho tiến bước:": ["You hit a qi barrier, as if an invisible wall blocks your advance:", "遇到灵气屏障，仿佛有无形之墙阻挡前进："],
  "Quan sát lại quy luật vận hành của công pháp, tìm điểm khuyết thiếu để phá.": ["Re-examine how the technique circulates and find the flaw to break through.", "重新观察功法运行规律，寻找缺漏以破之。"],
  "Đổi sang tu luyện một môn công pháp khác cấp cao hơn để dễ dàng vượt qua.": ["Switch to a higher-grade technique to get past it easily.", "改修另一门更高阶的功法以便轻松越过。"],
  "Dùng huyết dịch của chính mình để kích thích tiềm năng bộc phát nhất thời.": ["Use your own blood to force a momentary burst of potential.", "以自身精血激发一时的潜能爆发。"],
  "Thuận theo tự nhiên, khi nào duyên tới tường tự khắc phá, không cần cưỡng cầu.": ["Follow nature; when fate arrives the wall will break by itself, no need to force it.", "顺其自然，机缘到时壁障自破，无需强求。"],
  "Tâm ma hóa thành hình bóng người thân đã khuất, trách mắng đạo hữu bỏ bê gia đình để đi tu:": ["The heart demon takes the form of a departed loved one, scolding you for abandoning family to cultivate:", "心魔化作已故亲人之影，斥责道友弃家修道："],
  "Hiểu rõ sinh ly tử biệt là quy luật phàm trần, tâm như chỉ thủy không dao động.": ["Understand that parting and death are the law of the mortal world; keep your heart still as water.", "明白生离死别乃凡尘规律，心如止水不起波澜。"],
  "Tự nhủ tu thành tiên đạo rồi sẽ quay về nghịch chuyển thời gian cứu người thân.": ["Vow that once immortal you will reverse time to save them.", "自许修成仙道后逆转时光救回亲人。"],
  "Xem đó là lời cảnh tỉnh từ nhân quả, cần lập bài vị cúng bái mỗi ngày để chuộc lỗi.": ["Treat it as a karmic warning and set up a memorial tablet to atone daily.", "视之为因果警示，须立牌位每日供奉赎罪。"],
  "Lấy việc phụng sự chúng sinh trong tông môn làm hình thức bù đắp cho gia tộc.": ["Serve the sect's people as a way of making amends to your family.", "以服务宗门众生作为对家族的弥补。"],
  "Đến ngưỡng cửa đại viên mãn Luyện Khí, tâm ma hiện nguyên hình dụ dỗ buông bỏ để đổi lấy sự trường thọ giả tạo ở phàm gian:": ["At the threshold of Qi Refining perfection, the heart demon appears, tempting you to give up for a false longevity among mortals:", "临近炼气大圆满，心魔现出原形，诱你放弃以换取凡间虚假长寿："],
  "Cự tuyệt dứt khoát, chí hướng của ta là đại đạo trường sinh, quyết không lùi bước.": ["Refuse outright; my aim is the Great Dao of eternal life and I will not retreat.", "断然拒绝，吾志在长生大道，决不退缩。"],
  "Cân nhắc việc kết hợp cả hai: hưởng thụ vinh hoa phú quý rồi lúc già hãy tu tiếp.": ["Consider both: enjoy wealth and glory now, and cultivate again in old age.", "考虑两全：先享荣华富贵，年老再续修行。"],
  "Cho rằng làm một bậc hiền triết ở phàm gian cũng là một hình thức nhập thế tu đạo.": ["Reason that being a mortal sage is also a way of cultivating within the world.", "认为在凡间做一位贤哲也是入世修道。"],
  "Do dự vì sợ hãi kiếp nạn phía trước, xem việc lui về phàm gian là một lối thoát an toàn.": ["Hesitate in fear of the coming trials, seeing a return to mortal life as a safe escape.", "因惧怕前方劫难而犹豫，视退回凡间为安全出路。"],
  "Cảm giác sợ hãi thiên kiếp hoặc lôi kiếp sắp tới bắt đầu nảy sinh trong tiềm thức:": ["Fear of the coming heavenly or lightning tribulation begins to stir in your subconscious:", "对即将到来的天劫或雷劫的恐惧开始在潜意识中滋生："],
  "Thiên kiếp là thử thách tôi luyện cốt nhục, ta chuẩn bị tâm lý đón nhận.": ["The tribulation tempers flesh and bone; I prepare my mind to embrace it.", "天劫乃淬炼骨肉的考验，吾已做好迎接的准备。"],
  "Tìm kiếm các loại pháp bảo phòng thủ thượng hạng để hoàn toàn triệt tiêu uy lực lôi kiếp.": ["Seek top-grade defensive artifacts to nullify the lightning completely.", "寻找上品防御法宝，彻底抵消雷劫威力。"],
  "Cho rằng đạo tâm chưa đủ thì không nên miễn cưỡng độ kiếp, cứ trì hoãn thêm trăm năm.": ["If the Dao heart isn't ready, don't force it; delay another hundred years.", "认为道心不足便不应勉强渡劫，再拖延百年。"],
  "Tin rằng tích lũy công đức bằng việc làm việc thiện có thể miễn trừ hoàn toàn thiên kiếp.": ["Believe that merit from good deeds can exempt you from tribulation entirely.", "相信行善积德可完全免除天劫。"],
  "Tâm ma tạo ra ảo cảnh tòa bảo khổng lồ với vô số linh bảo nhưng yêu cầu phải tự phế một nửa tu vi hiện tại:": ["The heart demon conjures a vast treasury of spirit treasures, demanding you cripple half your cultivation:", "心魔幻化出藏有无数灵宝的巨大宝库，却要你自废一半修为："],
  "Ngoại vật chỉ là mây bay, tự tay tu luyện ra mới là chân chính thuộc về mình.": ["External things are drifting clouds; only what you cultivate yourself truly belongs to you.", "身外之物不过浮云，亲手修来才真正属于自己。"],
  "Chấp nhận phế tu vi vì nghĩ số linh bảo đó đủ để tu luyện lại nhanh gấp bội.": ["Accept, thinking those treasures will let you regain it many times faster.", "接受自废修为，以为那些灵宝足以加倍速度重修。"],
  "Thương lượng với tâm ma chỉ phế một phần tư để đổi lấy một nửa bảo vật.": ["Bargain with the demon: give up a quarter for half the treasures.", "与心魔讨价还价，只废四分之一换取一半宝物。"],
  "Cho rằng cơ duyên lớn thường đi kèm mạo hiểm lớn, đánh đổi là xứng đáng.": ["Great fortune comes with great risk; the trade is worth it.", "认为大机缘必伴大风险，值得交换。"],
  "Khoảnh khắc chuẩn bị dung hợp linh khí để bước qua ngưỡng cửa tiếp theo, tâm cảnh đột ngột trống rỗng, mất phương hướng:": ["As you prepare to fuse your qi and cross the next threshold, your mind suddenly turns empty and lost:", "正欲融合灵气跨过下一道门槛，心境骤然空虚，迷失方向："],
  "Hít sâu một hơi, tâm tưởng hướng về sơ tâm thuở ban đầu bước vào tiên môn.": ["Breathe deeply and turn your thoughts back to your original intent when you entered the immortal gate.", "深吸一口气，心念回归初入仙门时的初心。"],
  "Tạm gác việc đột phá, tìm kiếm các điển tịch cổ để tìm hiểu nguyên nhân trống rỗng.": ["Set the breakthrough aside and search ancient texts for the cause of the emptiness.", "暂搁突破，翻阅古籍探寻空虚之因。"],
  "Cho rằng đây là dấu hiệu cảnh báo của thiên đạo, nên lập tức dừng lại.": ["Take it as a warning from the Heavenly Dao and stop at once.", "认为这是天道的警示，应立即停止。"],
  "Dùng sự phẫn nộ và khao khát chiến thắng để lấp đầy khoảng trống trong tâm trí.": ["Fill the void in your mind with anger and the hunger to win.", "以愤怒与求胜之欲填满心中空洞。"],

  // ===== Khảo Tâm Ma · Trúc Cơ Kỳ =====
  "Khi bắt đầu đúc tòa đạo cơ, linh lực trong kinh mạch bắt đầu xung đột dữ dội, nguyên nhân cốt lõi là gì?": ["As you begin forging your Dao foundation, the spiritual power in your meridians clashes violently. What is the root cause?", "开始铸造道基时，经脉中灵力剧烈冲突，根本原因为何？"],
  "Do nền tảng Luyện Khí chưa vững chắc, tạp chất trong kinh mạch chưa được luyện sạch.": ["Your Qi Refining base is unstable; impurities in the meridians were not refined away.", "炼气根基不稳，经脉杂质未炼净。"],
  "Do linh thạch dùng để đột phá có phẩm chất không đồng đều.": ["The Spirit Stones used for the breakthrough were of uneven quality.", "突破所用灵石品质参差不齐。"],
  "Do xung khắc giữa thiên địa linh khí và công pháp bản mệnh.": ["A conflict between heaven-and-earth qi and your core technique.", "天地灵气与本命功法相冲。"],
  "Do thời khắc chọn để đúc đạo cơ không hợp với thiên can địa chi.": ["The chosen hour was out of harmony with the heavenly stems and earthly branches.", "铸基时辰与天干地支不合。"],
  "Tâm ma hiện lên hình ảnh một vị trưởng lão từng coi thường mình, kích động ta tìm đến báo thù ngay lập tức:": ["The heart demon shows an elder who once scorned you, urging immediate revenge:", "心魔幻化出曾轻视自己的长老，煽动我立即报仇："],
  "Thù hận chỉ là gánh nặng cho đạo tâm, chờ khi đại thành ta sẽ đường đường chính chính giải quyết.": ["Hatred only burdens the Dao heart; once I achieve greatness I will settle it openly and honourably.", "仇恨只是道心的负担，待大成之日我自会堂堂正正了结。"],
  "Dùng danh nghĩa đại đạo để trừng phạt kẻ tiểu nhân, ra tay trước để chiếm tiên cơ.": ["Punish the petty man in the name of the Dao, striking first to seize the advantage.", "以大道之名惩治小人，先下手为强。"],
  "Âm thầm ghi khắc vào sinh tử mộc, đợi có thực lực sẽ dùng thủ đoạn tương tự trả lại.": ["Secretly carve it on a life-and-death tablet and repay in kind once strong enough.", "暗中刻于生死木上，待有实力以同样手段奉还。"],
  "Chuyển hóa phẫn nộ thành áp lực tu luyện, nhưng trong lòng vẫn canh cánh mối hận.": ["Turn the anger into drive to cultivate, while still nursing the grudge.", "化愤怒为修炼动力，心中却仍耿耿于怀。"],
  "Cảm giác linh khí hóa lỏng trong đan điền quá nặng nề, ép chặt vào tâm thần gây đau đớn:": ["The liquefied qi in your dantian feels so heavy it presses painfully on your mind:", "丹田中液化的灵气过于沉重，压迫心神引发剧痛："],
  "Kiên trì dùng thần thức dung hợp, thích nghi với sự thay đổi chất của linh lực.": ["Persist in fusing it with divine sense and adapt to the change in the spiritual power.", "坚持以神识融合，适应灵力的质变。"],
  "Phân tán bớt linh lực ra các kinh mạch phụ để giảm áp lực cho đan điền.": ["Spread some power to secondary meridians to ease the dantian.", "将部分灵力分散至旁支经脉以减轻丹田压力。"],
  "Dùng đan dược an thần để làm dịu cảm giác đau đớn ở thần kinh.": ["Take calming pills to soothe the pain.", "服用安神丹药缓解神经痛楚。"],
  "Thuận theo áp lực đó để nén ép linh lực thành hình thể đặc quánh hơn.": ["Go with the pressure to compress the power into a denser form.", "顺应压力将灵力压缩得更加凝实。"],
  "Thuận theo áp lực đó để nén ép linh lực thành hình thể đặc quánh nhanh hơn.": ["Go with the pressure to compress the power into a denser form faster.", "顺应压力，更快地将灵力压缩凝实。"],
  "Khi đối mặt với ảo cảnh người mình từng yêu thương bỏ rơi để đi theo cường giả khác:": ["Facing an illusion of a former beloved leaving you for a stronger cultivator:", "面对昔日所爱弃己投奔其他强者的幻境："],
  "Đạo bất đồng bất tương vi mưu, tình ái phàm trần nay đã là mây bay.": ["Those on different paths cannot walk together; mortal love is now drifting cloud.", "道不同不相为谋，凡尘情爱已成浮云。"],
  "Tự hứa sẽ trở thành cường giả tối cao để người đó phải hối hận vì đã rời đi.": ["Vow to become supreme so they regret leaving.", "发誓成为至强者，让对方后悔离去。"],
  "Xem đó là bài học về sự phũ phàng của thế gian, từ nay đóng chặt cửa lòng.": ["Take it as a lesson in the world's cruelty and close your heart forever.", "视之为世间无情的教训，从此紧闭心门。"],
  "Cho rằng duyên phận chưa đủ sâu, cần tìm cách níu kéo bằng thực lực.": ["Believe the bond was not deep enough and try to win them back with power.", "认为缘分不够深，须以实力挽回。"],
  "Linh đan phá cảnh dùng đã cạn mà đạo cơ vẫn chưa hoàn thiện, tâm sinh hoảng loạn:": ["Your breakthrough pills are spent yet the foundation is incomplete, and panic rises:", "破境灵丹已用尽而道基仍未圆满，心生慌乱："],
  "Bình tĩnh dừng lại, dùng thiên nhiên thảo mộc để tự điều hòa sinh khí.": ["Calmly pause and use natural herbs to rebalance your vitality.", "冷静停下，以天然草木自行调和生机。"],
  "Dùng công pháp thiêu đốt tiềm năng bản mệnh để hoàn thành nốt phần còn thiếu.": ["Burn your innate potential with a technique to finish what remains.", "以燃烧本命潜能的功法完成剩余部分。"],
  "Tin tưởng vào sự kiên trì của bản thân, tiếp tục ép buộc cơ thể đột phá không cần đan dược.": ["Trust your persistence and force the body through without pills.", "相信自身毅力，不靠丹药强行突破。"],
  "Mượn ngoại lực từ linh khí của người khác để hoàn thiện đạo cơ.": ["Borrow others' qi to complete the foundation.", "借他人灵气之外力完善道基。"],
  "Tâm ma thì thầm rằng thiên tài trăm năm gặp một như ta cũng chỉ là con cờ trong tay môn phái:": ["The heart demon whispers that even a once-in-a-century genius like you is only a pawn of the sect:", "心魔低语：纵是百年一遇的天才如我，也不过是宗门手中的棋子："],
  "Ta tu cho chính ta, mạnh mẽ vượt lên trên mọi sự sắp đặt của số phận.": ["I cultivate for myself and rise above every arrangement of fate.", "吾为己而修，强势超越一切命运安排。"],
  "Cần phải tỏ ra ngoan ngoãn, che giấu tài năng thực sự để qua mặt các cao tầng.": ["Act obedient and hide your true talent to fool the elders.", "须装作乖顺，隐藏真实才能以瞒过高层。"],
  "Tìm cách nắm giữ quyền lực trong tông môn để không bị kẻ khác sai khiến.": ["Seize power in the sect so no one can command you.", "设法掌握宗门权力，以免受人驱使。"],
  "Xem việc làm quân cờ cũng là một cách mượn thế lực tông môn để phát triển.": ["Being a pawn is just a way to use the sect's power to grow.", "把做棋子视为借宗门之势发展的方式。"],
  "Khoảnh khắc ngưng kết đạo đài thành công chín phần mười, tâm ma đột ngột tạo ra ảo giác thiên địa sụp đổ:": ["With your Dao platform nine-tenths condensed, the heart demon suddenly conjures heaven and earth collapsing:", "道台凝结九成之际，心魔骤然幻化天地崩塌："],
  "Nhìn thấu tất cả là hư ảo, tâm như kính sáng soi chiếu mọi yêu ma.": ["See through it all as illusion; your heart is a bright mirror revealing every demon.", "看透一切皆为虚幻，心如明镜照见诸般妖魔。"],
  "Dùng phần linh lực còn lại để bảo vệ những thứ trân quý trong ảo cảnh.": ["Spend your remaining power protecting the treasures in the illusion.", "用剩余灵力守护幻境中珍贵之物。"],
  "Tự nhủ nếu đây là định mệnh thì đành chấp nhận sụp đổ cùng thiên địa.": ["If this is destiny, accept collapsing with heaven and earth.", "若是天命，便与天地一同崩塌。"],
  "Tìm điểm yếu của thiên địa ảo để phản kích và thoát ra.": ["Find the illusion's weakness to strike back and escape.", "寻找幻境天地的弱点反击脱出。"],
  "Sức mạnh bùng nổ của Trúc Cơ khiến ta cảm thấy mình có thể ngạo thị phàm trần, tâm sinh ngạo mạn:": ["The surge of Foundation power makes you feel above all mortals, and arrogance grows:", "筑基爆发的力量让我觉得可以傲视凡尘，心生傲慢："],
  "Núi cao còn có núi cao hơn, Trúc Cơ mới chỉ là khởi đầu của chân chính tu hành.": ["There is always a higher mountain; Foundation is only the start of true cultivation.", "山外有山，筑基不过是真正修行的开始。"],
  "Kẻ mạnh có quyền định đoạt số phận kẻ yếu, đó là quy luật tự nhiên của tu tiên giới.": ["The strong decide the fate of the weak; that is the natural law of the cultivation world.", "强者主宰弱者命运，乃修仙界的自然法则。"],
  "Chỉ nên khiêm nhường trước những người mạnh hơn, còn phàm nhân thì không cần bận tâm.": ["Be humble only before the stronger; mortals don't matter.", "只需在强者面前谦逊，凡人不必在意。"],
  "Sự tự tin là cần thiết cho đạo tâm, ngạo mạn đôi khi giúp uy hiếp đối thủ.": ["Confidence is needed for the Dao heart; arrogance can intimidate rivals.", "自信是道心所需，傲慢有时可震慑对手。"],
  "Cảm giác thần thức bị xé rách khi mở rộng không gian đan điền ở tầng cuối Trúc Cơ:": ["Your divine sense feels torn apart as you expand the dantian at Foundation's final layer:", "筑基末层扩展丹田空间时，神识如被撕裂："],
  "Nghiến răng chịu đựng, dùng ý chí sắt đá tôi luyện thần hồn kiên cường.": ["Grit your teeth and temper your soul with iron will.", "咬牙忍受，以钢铁意志淬炼坚韧神魂。"],
  "Thu hẹp phạm vi đan điền lại để bảo toàn thần thức khỏi tổn thương.": ["Shrink the dantian to protect your divine sense.", "缩小丹田范围以保全神识免受损伤。"],
  "Dùng bí pháp phân tâm để chia nhỏ nỗi đau thành nhiều phần dễ chịu hơn.": ["Use a mind-splitting art to divide the pain into bearable parts.", "以分心秘法将痛楚分成多份便于承受。"],
  "Chấp nhận dừng lại ở mức hiện tại, không mạo hiểm mở rộng thêm nữa.": ["Accept stopping here and risk no further expansion.", "接受止步于此，不再冒险扩展。"],
  "Trước ngưỡng cửa bước vào Kim Đan, tâm ma hóa thành bản ngã hoàn hảo không tì vết, chế giễu sự tầm thường của ta:": ["At the threshold of Golden Core, the heart demon becomes a flawless version of you, mocking your mediocrity:", "踏入金丹门槛前，心魔化作完美无瑕的自我，嘲笑我的平庸："],
  "Bản ngã chính là ta, không hoàn hảo mới là nhân sinh tu đạo thực thụ.": ["That self is me; imperfection is the true life of cultivation.", "那自我便是我，不完美才是真正的修道人生。"],
  "Quyết tâm tiêu diệt bản ngã giả lập đó để chứng minh bản thân mới là chân chính.": ["Resolve to destroy the false self to prove you are the real one.", "决心消灭那虚假自我以证明自己才是真我。"],
  "Học hỏi những điểm hoàn hảo của nó để tự hoàn thiện bản thân ngay lúc này.": ["Learn from its perfection to perfect yourself right now.", "学习其完美之处，当下即完善自身。"],
  "Thừa nhận sự thua kém của mình và xin nó chỉ dẫn con đường tiếp theo.": ["Admit your inferiority and ask it to guide your way.", "承认自己不如，求其指引前路。"],

  // ===== Khảo Tâm Ma · Kim Đan Kỳ =====
  "Ngưng kết Kim Đan đòi hỏi sự viên mãn, nhưng nội tâm bỗng nhớ về những lỗi lầm thời phàm nhân:": ["Condensing a Golden Core demands perfection, yet memories of mistakes from your mortal years suddenly arise:", "凝结金丹须求圆满，内心却忽然忆起凡人时期的种种过错："],
  "Quá khứ đã qua là bài học tôi luyện đạo tâm, ta dung hòa nó thành dưỡng chất.": ["The past is a lesson that tempers my Dao heart; I will refine it into nourishment.", "过去已成淬炼道心的教训，我将其融化为滋养。"],
  "Lập tức dừng bế quan, trở về phàm gian làm việc thiện để bù đắp tội lỗi xưa.": ["End seclusion at once and return to the mortal world to do good and atone for old sins.", "立即停止闭关，返回凡间行善，以弥补昔日罪过。"],
  "Dùng bí pháp phong ấn ký ức đó vào góc sâu nhất của thần thức.": ["Use a secret art to seal those memories in the deepest corner of divine sense.", "以秘法将那段记忆封印在神识最深处。"],
  "Chấp nhận mang theo vết nhơ đó vì không ai trên đời là hoàn hảo.": ["Accept carrying the stain, for no one in this world is perfect.", "接受带着这份污点，因为世间无人完美。"],
  "Kim Đan vừa thành hình nhưng có vết rạn nhỏ do tâm bất định, đối sách tốt nhất là gì?": ["The Golden Core has just formed, but an unsettled heart leaves a tiny crack. What is the best response?", "金丹初成，却因心境不稳出现细小裂纹，最佳对策为何？"],
  "Dùng linh lực thuần khiết và chân hỏa từ từ tôi luyện, bồi đắp lại vết nứt.": ["Temper it slowly with pure spiritual power and true fire, carefully mending the crack.", "以纯净灵力与真火徐徐淬炼，重新弥合裂痕。"],
  "Dùng dược lực mạnh để ép Kim Đan dung hợp lại một cách bạo lực.": ["Use potent medicine to force the Golden Core back together violently.", "以强猛药力粗暴逼迫金丹重新融合。"],
  "Chấp nhận chất lượng Kim Đan bị giảm sút, miễn là đột phá thành công là được.": ["Accept a lower-quality Golden Core as long as the breakthrough succeeds.", "只要突破成功，便接受金丹品质下降。"],
  "Luyện hóa thêm một viên phụ đan để che lấp vết rạn bên ngoài.": ["Refine a secondary core to conceal the crack from the outside.", "再炼一枚辅丹，从外部遮掩裂纹。"],
  "Cảm giác cô độc của một Kim Đan chân nhân sống thọ hàng trăm năm khiến bạn bè phàm trần dần rời xa:": ["The loneliness of a Golden Core cultivator living for centuries grows as mortal friends gradually pass away:", "金丹真人寿数百年，凡人旧友渐次离去，孤独之感油然而生："],
  "Đường tu tiên là cô độc, duyên khởi duyên diệt hãy để tự nhiên.": ["The immortal path is solitary; let bonds arise and fade according to nature.", "修仙之路本就孤独，缘起缘灭，顺其自然。"],
  "Truyền thụ một ít công pháp trường sinh cho họ để có thể đồng hành lâu hơn.": ["Teach them a little longevity art so they can accompany you longer.", "传授他们些许长生功法，使其能陪伴更久。"],
  "Tự cô lập cảm xúc từ trước để không phải đau đớn khi chứng kiến họ ra đi.": ["Cut off your emotions in advance so their departure will not hurt.", "提前封闭情感，以免目睹他们离去时痛苦。"],
  "Xem việc phàm nhân qua đời là quy luật sinh tử bình thường, không cần bận lòng.": ["Regard mortal death as the ordinary law of life and feel no concern.", "视凡人逝去为寻常生死规律，不必挂怀。"],
  "Tâm ma tạo ra ảo cảnh môn phái bị diệt vong, sư phụ và đồng môn ngã xuống trước mặt:": ["The heart demon conjures the sect's destruction, with master and fellow disciples falling before your eyes:", "心魔幻化宗门覆灭之景，师尊与同门尽皆倒在眼前："],
  "Kìm nén bi thương, ghi khắc thù hận vào tim để phấn đấu mạnh mẽ hơn.": ["Restrain your grief and engrave the hatred in your heart to drive yourself forward.", "压下悲痛，将仇恨铭刻于心，以此鞭策自己变强。"],
  "Thề sẽ dùng toàn bộ sức mạnh để tiêu diệt kẻ thù trong ảo cảnh ngay lập tức.": ["Swear to unleash all your power and destroy the enemy in the illusion immediately.", "发誓立即倾尽全力，消灭幻境中的仇敌。"],
  "Tự trách bản thân yếu kém không bảo vệ được mọi người, sinh lòng thoái chí.": ["Blame your weakness for failing to protect everyone and lose the will to continue.", "自责实力低微未能保护众人，心生退意。"],
  "Cho rằng đây là điềm báo trước, cần lập tức trở về tông môn kiểm tra phòng thủ.": ["Take it as an omen and return to the sect at once to inspect its defences.", "认定这是预兆，须立即返回宗门检查防备。"],
  "Đạo lý tu tiên mâu thuẫn với lòng trắc ẩn khi phải ra tay sát hại đồng loại để tranh đoạt tài nguyên:": ["The principles of cultivation conflict with compassion when competing for resources may require killing your own kind:", "争夺资源时不得不对同类下杀手，修仙之理与慈悲之心彼此冲突："],
  "Tu tiên tranh đoạt với trời đất, ta không hại người nhưng cũng không để người hại ta.": ["Cultivation contends with heaven and earth; I harm no one, yet I will not let others harm me.", "修仙乃与天地争夺；我不害人，亦不容人害我。"],
  "Chỉ cướp đoạt tài nguyên của kẻ ác, tuyệt đối không ra tay với người vô tội.": ["Take resources only from the wicked and never act against the innocent.", "只夺恶人资源，绝不对无辜之人出手。"],
  "Chọn cách ẩn cư nơi thâm sơn cùng cốc để không phải tham gia vào những cuộc tranh đoạt.": ["Withdraw to remote mountains so you never need to join such conflicts.", "隐居深山穷谷，从此不参与任何争夺。"],
  "Xem lòng trắc ẩn là điểm yếu chí mạng, cần phải tàn nhẫn hơn nữa.": ["Treat compassion as a fatal weakness and become even more ruthless.", "视慈悲为致命弱点，必须更加狠绝。"],
  "Áp lực từ lôi kiếp Kim Đan kiết đỉnh khiến tâm thần dao động, sợ hãi cái chết:": ["The pressure of the Golden Core pinnacle lightning tribulation shakes your mind and awakens fear of death:", "金丹结顶雷劫的威压令心神动摇，对死亡生出恐惧："],
  "Sợ chết là bản năng, vượt qua cái chết để chạm đến vĩnh hằng mới là tu sĩ.": ["Fear of death is instinct; a cultivator transcends it to reach eternity.", "畏死乃本能，跨越死亡触及永恒，方为修士。"],
  "Chuẩn bị thật nhiều pháp bảo thế mạng để chắc chắn sống sót qua kiếp nạn.": ["Prepare many life-saving artifacts to guarantee survival through the tribulation.", "备下大量替命法宝，确保自己安然渡过劫难。"],
  "Tìm kiếm sự hỗ trợ từ các trưởng lão để họ che chở một phần lôi kiếp.": ["Seek help from elders so they can shield you from part of the lightning tribulation.", "寻求长老相助，请其替我遮挡部分雷劫。"],
  "Chấp nhận tu vi dừng lại ở mức an toàn, không mạo hiểm kiết đỉnh nữa.": ["Let cultivation stop at a safe level and never risk reaching the pinnacle.", "接受修为停在安全层次，不再冒险结顶。"],
  "Kim Đan đại viên mãn, quyền lực trong tay có thể quyết định sinh tử hàng vạn người, tâm sinh ngã mạn:": ["At Golden Core perfection, the power in your hands can decide the lives of tens of thousands, and arrogance arises:", "金丹大圆满，手中权势可决万人生死，傲慢随之滋生："],
  "Nắm quyền lực càng lớn, tâm trí càng phải tĩnh lặng, không để ngoại vật sai khiến.": ["The greater the power you hold, the calmer your mind must remain, never ruled by external things.", "权势越大，心境越须宁静，不可受外物驱使。"],
  "Sử dụng quyền lực đó để thiết lập trật tự nghiêm minh, trừ gian diệt bạo.": ["Use that power to establish strict order, punish evil, and eliminate tyranny.", "运用权力建立森严秩序，除奸灭暴。"],
  "Giao lại quyền lực cho người khác quản lý để bản thân tập trung tu luyện.": ["Hand the power to someone else so you can focus on cultivation.", "将权力交由他人掌管，自己专心修炼。"],
  "Hiểu rằng quyền lực chỉ là công cụ bảo vệ bản thân trên con đường đại đạo.": ["Understand that power is merely a tool to protect yourself upon the Great Dao.", "明白权力只是大道途中保护自身的工具。"],
  "Tâm ma biến thành một vị tiên nhân cao cao tại thượng, chê bai Kim Đan của ta chỉ là phàm phẩm:": ["The heart demon becomes a lofty immortal who scorns your Golden Core as merely mortal-grade:", "心魔化作高高在上的仙人，讥讽我的金丹不过凡品："],
  "Phàm phẩm hay thần phẩm, tự ta đi lên bằng đôi chân này chính là chí bảo.": ["Mortal-grade or divine-grade, the path I walk on my own feet is the true supreme treasure.", "凡品也好神品也罢，凭双脚走出的道路才是至宝。"],
  "Tìm mọi cách luyện hóa lại Kim Đan để đạt chuẩn thần phẩm theo lời tiên nhân.": ["Find every possible way to refine the Golden Core anew and meet the immortal's divine-grade standard.", "依仙人之言，想尽办法重炼金丹以达神品。"],
  "Chứng minh cho vị tiên nhân đó thấy phàm phẩm cũng có thể chiến thắng thần phẩm.": ["Prove to the immortal that mortal-grade can also defeat divine-grade.", "向那仙人证明，凡品亦可战胜神品。"],
  "Cho rằng tiên nhân chỉ có cái nhìn phiến diện, không đáng để bận tâm.": ["Dismiss the immortal's view as narrow and unworthy of concern.", "认为仙人目光片面，不值得在意。"],
  "Khoảnh khắc chuẩn bị dung hợp nguyên thần để bước vào Nguyên Anh, tâm cảnh xuất hiện kẽ hở hoài nghi:": ["As you prepare to merge the primordial spirit and enter Nascent Soul, a crack of doubt appears in your mind:", "正欲融合元神踏入元婴，心境中忽然出现一丝怀疑的裂隙："],
  "Giữ vững một niệm chân như, hợp nhất thần hồn không chút dao động.": ["Hold fast to one thought of true suchness and unite soul and spirit without the slightest wavering.", "守住一念真如，神魂合一，毫不动摇。"],
  "Dùng sự quyết đoán và uy quyền áp chế mọi hoài nghi trong tâm trí.": ["Use resolve and authority to suppress every doubt in the mind.", "以果决与威势压下心中所有怀疑。"],
  "Định kỳ hoãn lại việc đột phá để tìm hiểu rõ nguồn gốc của mối hoài nghi.": ["Postpone the breakthrough indefinitely to investigate the source of the doubt.", "暂缓突破，查明这份怀疑的根源。"],
  "Chấp nhận hoài nghi như một phần của quá trình tư duy trưởng thành.": ["Accept doubt as part of the process of intellectual growth.", "接受怀疑，将其视为心智成长的一部分。"],
  "Ảo ảnh về sự vĩnh hằng và trống rỗng của cõi tiên giới hiện ra, khiến ý chí tu hành lung lay:": ["A vision of the Immortal Realm's eternity and emptiness appears, shaking your will to cultivate:", "仙界永恒而空寂的幻象浮现，令修行意志开始动摇："],
  "Đạo tại nhân tâm, vĩnh hằng hay không là do chính ta định nghĩa.": ["The Dao lies in the human heart; whether eternity has meaning is mine to define.", "道在人心，永恒与否，由我亲自定义。"],
  "Tập trung vào hiện tại, không nghĩ đến những chuyện xa xôi ở cõi tiên giới.": ["Focus on the present and ignore distant matters of the Immortal Realm.", "专注当下，不去思虑仙界的遥远之事。"],
  "Cho rằng sự trống rỗng là trạng thái cao nhất của niết bàn, cần phải hướng tới.": ["Believe emptiness is the highest state of nirvana and should be pursued.", "认为空寂乃涅槃至境，应当追求。"],
  "Tìm kiếm ý nghĩa tu hành từ việc mang lại lợi ích cho chúng sinh.": ["Seek the meaning of cultivation in bringing benefit to all living beings.", "从造福众生之中寻找修行的意义。"],

  "Khảo Tâm Ma": ["Heart Demon Trial", "考心魔"],

  // Tên cảnh giới gốc (không hậu tố "Kỳ")
  "Luyện Khí": ["Qi Refining", "炼气"],
  "Trúc Cơ": ["Foundation Establishment", "筑基"],
  "Kim Đan": ["Golden Core", "金丹"],
  "Nguyên Anh": ["Nascent Soul", "元婴"],
  "Hóa Thần": ["Spirit Severing", "化神"],
  "Luyện Hư": ["Void Refining", "炼虚"],
  "Hợp Thể": ["Body Integration", "合体"],
  "Đại Thừa": ["Mahayana", "大乘"],
  "Độ Kiếp": ["Tribulation Transcendence", "渡劫"],
  "Đăng Tiên": ["Ascension", "登仙"],

  // Phẩm cấp pháp bảo
  "Sơ cấp": ["Beginner", "初级"],
  "Trung cấp": ["Intermediate", "中级"],
  "Cao cấp": ["Advanced", "高级"],
  "Trấn phái": ["Sect-Guarding", "镇派"],
  "Tuyệt học": ["Peerless", "绝学"],
  "Tối cao": ["Supreme", "至高"],

  // Tên pháp bảo
  "Tụ Linh Kỳ": ["Spirit Gathering Banner", "聚灵旗"],
  "Hộ Tâm Kính": ["Heart-Guarding Mirror", "护心镜"],
  "Thanh Quang Kiếm": ["Azure Light Sword", "青光剑"],
  "Dược Vương Lô": ["Medicine King Cauldron", "药王炉"],
  "Lưỡng Nghi Bàn": ["Yin-Yang Disk", "两仪盘"],
  "Hạo Thiên Tháp": ["Vast Heaven Pagoda", "昊天塔"],
  "Vạn Hồn Phiên": ["Myriad Souls Banner", "万魂幡"],
  "Hư Thiên Đỉnh": ["Void Heaven Cauldron", "虚天鼎"],
  "Hỗn Nguyên Kim Đấu": ["Primordial Golden Ladle", "混元金斗"],
  "Thông Thiên Phù Đồ": ["Heaven-Reaching Seal", "通天符箓"],
};

import { buildHighContent } from "@/i18n/contentHigh";
import { ADVENTURE } from "@/i18n/contentAdventure";
import { CATALOG } from "@/i18n/catalog";
import { trStream } from "@/i18n/contentStream";
import { MANUALS, PILLS, HERBS, ARTIFACTS, REALMS, GRADE_INFO, ELEMENT_INFO } from "@/lib/cultivation";

/** Tên công pháp, đan dược, linh căn (vi → [en, zh]) lấy từ CATALOG theo id. */
const NAMES: Record<string, readonly [string, string]> = (() => {
  const out: Record<string, readonly [string, string]> = {};
  for (const m of MANUALS) { const e = CATALOG[`man.${m.id}`]; if (e) out[m.name] = e; }
  for (const p of PILLS) { const e = CATALOG[`pill.${p.id}`]; if (e) out[p.name] = e; }
  for (const [items, prefix] of [[MANUALS, "man"], [PILLS, "pill"], [HERBS, "herb"], [ARTIFACTS, "art"]] as const) {
    for (const item of items) {
      const name = CATALOG[`${prefix}.${item.id}`];
      if (name) out[item.name] = name;
      if ("desc" in item) {
        const desc = CATALOG[`${prefix}Desc.${item.id}`];
        if (desc) out[item.desc] = desc;
      }
    }
  }
  REALMS.forEach((realm, index) => {
    const name = CATALOG[`realm.${index}`];
    const desc = CATALOG[`realmDesc.${index}`];
    if (name) out[realm.name] = name;
    if (desc) out[realm.desc] = desc;
  });
  for (const [id, grade] of Object.entries(GRADE_INFO)) {
    const entry = CATALOG[`grade.${id}`];
    if (entry) out[grade.name] = entry;
  }
  for (const [id, element] of Object.entries(ELEMENT_INFO)) {
    const entry = CATALOG[`el.${id}`];
    if (entry) out[element.name] = entry;
  }
  return out;
})();
function trName(vi: string, lang: Lang): string {
  const e = NAMES[vi];
  return e ? e[lang === "en" ? 0 : 1] : trContent(vi, lang);
}
export function trRoot(vi: string, lang: Lang): string {
  if (lang === "vi") return vi;
  const m = vi.match(/^(.+?) (\S+) Linh Căn$/);
  if (!m) return vi;
  const g = Object.entries(GRADE_INFO).find(([, v]) => v.name === m[1]);
  const el = Object.entries(ELEMENT_INFO).find(([, v]) => v.name === m[2]);
  const i = lang === "en" ? 0 : 1;
  const gn = g ? CATALOG[`grade.${g[0]}`]?.[i] ?? m[1] : m[1];
  const en = el ? CATALOG[`el.${el[0]}`]?.[i] ?? m[2] : m[2];
  return lang === "en" ? `${gn} ${en} Spirit Root` : `${gn}${en}灵根`;
}

const FIXED_LOG: Record<string, readonly [string, string]> = {
  "Đột phá thất bại, may nhờ Hộ Tâm Đan hộ thể nên linh khí không tán.": ["The breakthrough fails, but the Heart Protecting Pill preserves your qi.", "突破失败，幸有护心丹护体，灵气未曾散失。"],
  "Cơ duyên pháp bảo chưa vượt qua mốc cảnh giới kế tiếp.": ["Your artifact fortune has not yet reached the next realm milestone.", "法宝机缘尚未达到下一个境界里程碑。"],
  "Ngươi ngồi xuống bồ đoàn, lần đầu dẫn linh khí nhập thể. Con đường trường sinh bắt đầu từ đây.": ["You sit on a meditation cushion and draw spiritual qi into your body for the first time. Your path to immortality begins here.", "你坐上蒲团，第一次引灵气入体。长生之路由此开始。"],
  "Lôi kiếp nghiền nát hộ thể chân khí, ngươi thổ huyết, tu vi tổn hại nặng nề.": ["The tribulation lightning shatters your protective qi; you cough blood and your cultivation is gravely damaged.", "雷劫击碎护体真气，你口吐鲜血，修为重创。"],
  "Khí tức hỗn loạn, ngươi buộc phải thu công, mất đi một nửa linh khí.": ["Your qi falls into chaos; you are forced to stop and lose half your spiritual energy.", "气息紊乱，你被迫收功，损失一半灵气。"],
  "Tụ Khí Đan hóa thành dòng nhiệt lưu chảy khắp kinh mạch.": ["The Qi Gathering Pill becomes a warm current flowing through your meridians.", "聚气丹化作一股热流，流遍全身经脉。"],
  "Thần thức ngưng tụ, tốc độ hấp thu linh khí tăng vọt.": ["Your divine sense condenses; qi absorption speed soars.", "神识凝聚，灵气吸收速度暴涨。"],
  "⚡ Thử nghiệm Đăng Tiên: Độ Kiếp Viên Mãn!": ["⚡ Ascension test: Tribulation Transcendence perfected!", "⚡ 登仙测试：渡劫圆满！"],
};

/** Dịch mọi dòng nhật ký/thông báo: thử từ điển câu ghép trước, rồi trLog. */
export function trAny(text: string, lang: Lang): string {
  if (lang === "vi") return text;
  const artifact = text.match(/^(.*?)\s+(Ngươi nhận được .+? \(.+?\) — mốc \d+\/10!|Cơ duyên pháp bảo chưa vượt qua mốc cảnh giới kế tiếp\.)$/);
  if (artifact?.[1] && artifact[2]) return `${trAny(artifact[1], lang)} ${trLog(artifact[2], lang)}`;
  const direct = trStream(text, lang);
  if (direct !== text) return direct;
  const [core, suffix] = splitSuffix(text);
  const streamCore = trStream(core, lang);
  if (streamCore !== core) return `${streamCore}${suffix ? ` ${trBrackets(suffix, lang)}` : ""}`;
  return trStream(trLog(text, lang), lang);
}

// Bản dịch Khảo Tâm Ma Nguyên Anh → Độ Kiếp, sinh theo thứ tự dữ liệu gốc.
const HIGH_CONTENT = buildHighContent();

export function trContent(vi: string, lang: "vi" | "en" | "zh"): string {
  if (lang === "vi") return vi;
  const e = NAMES[vi] ?? CONTENT[vi] ?? HIGH_CONTENT[vi] ?? ADVENTURE[vi];
  if (e) return e[lang === "en" ? 0 : 1];
  const titleParts = vi.split(" — ");
  if (titleParts.length === 2 && titleParts.every((part) => ADVENTURE[part])) {
    return titleParts.map((part) => trContent(part, lang)).join(" — ");
  }
  const description = vi.match(/^(.*?) (Một .+?) xuất hiện trước mặt, (.+?) bao phủ bốn phía\.$/);
  if (description?.[1] && description[2] && description[3]) {
    const base = trContent(description[1], lang);
    const place = trContent(description[2], lang);
    const aura = trContent(description[3], lang);
    return lang === "en" ? `${base} ${place} appears before you, with ${aura} surrounding you on all sides.` : `${base}${place}出现在眼前，${aura}笼罩四方。`;
  }
  return trRoot(vi, lang);
}

type Lang = "vi" | "en" | "zh";

/** Dịch tên cảnh giới dạng "Luyện Khí tầng 3" hoặc tên trần. */
export function trRealm(title: string, lang: Lang): string {
  if (lang === "vi") return title;
  const m = title.match(/^(.*?)\s+tầng\s+(\d+)$/);
  if (m) {
    const base = trContent(m[1]!.trim(), lang);
    return lang === "en" ? `${base} Layer ${m[2]}` : `${base}第${m[2]}层`;
  }
  return trContent(title, lang);
}

/** Tách phần hậu tố thưởng/phạt dạng [+ N ...] ở cuối câu. */
function splitSuffix(s: string): [string, string] {
  const m = s.match(/^(.*?)\s*((?:\[[^\]]*\]\s*)+)$/);
  return m ? [m[1]!, m[2]!.trim()] : [s, ""];
}

/** Dịch các hậu tố [± N% tu vi], [± N Linh Thạch (±P%)], [+ N Linh Thảo]. */
function trBrackets(s: string, lang: Lang): string {
  return s
    .replace(/\[\s*([+-])\s*(\d+(?:\.\d+)?)%\s*tu vi\s*\]/g, (_a, sign: string, n: string) =>
      lang === "en" ? `[${sign} ${n}% cultivation]` : `[${sign} ${n}%修为]`,
    )
    .replace(/\[\s*([+-])\s*(\d+)\s*Linh Thạch\s*(\(\s*[+-]?\s*\d+%\s*\))?\s*\]/g, (_a, sign: string, n: string, p?: string) =>
      lang === "en" ? `[${sign} ${n} Spirit Stones${p ?? ""}]` : `[${sign} ${n}灵石${p ?? ""}]`,
    )
    .replace(/\[\s*([+-])\s*(\d+)\s*(Linh Thảo|Huyết Chi|Băng Liên|Long Đảm Thảo|Tụ Khí Đan|Phá Cảnh Đan|Hộ Tâm Đan|Ngưng Thần Đan)\s*\]/g, (_a, sign: string, n: string, name: string) =>
      lang === "en" ? `[${sign} ${n} ${trName(name, lang)}]` : `[${sign} ${n}${trName(name, lang)}]`,
    );
}

/** Dịch một dòng nhật ký: xử lý tiền tố động (Kỳ Duyên, đột phá, pháp bảo) rồi tra từ điển. */
export function trLog(text: string, lang: Lang): string {
  if (lang === "vi") return text;
  let m: RegExpMatchArray | null;
  const en = lang === "en";
  const fixed = FIXED_LOG[text];
  if (fixed) return fixed[en ? 0 : 1];
  if ((m = text.match(/^Ngươi lĩnh ngộ bí tịch (.+)\.$/))) {
    return en ? `You comprehend the manual ${trName(m[1]!, lang)}.` : `你领悟秘籍${trName(m[1]!, lang)}。`;
  }
  if ((m = text.match(/^Ngươi nhóm lửa đan lô, bắt đầu luyện (.+)\.$/))) {
    return en ? `You light the cauldron and begin refining ${trName(m[1]!, lang)}.` : `你点燃丹炉，开始炼制${trName(m[1]!, lang)}。`;
  }
  if ((m = text.match(/^Đan lô mở ra, luyện thành công một viên (.+)\.$/))) {
    return en ? `The cauldron opens: one ${trName(m[1]!, lang)} refined successfully.` : `丹炉开启，成功炼成一枚${trName(m[1]!, lang)}。`;
  }
  if ((m = text.match(/^Hỏa hầu sai lệch, (.+) hóa thành tro tàn\.$/))) {
    return en ? `The flame went wrong; the ${trName(m[1]!, lang)} turned to ash.` : `火候失准，${trName(m[1]!, lang)}化为灰烬。`;
  }
  if ((m = text.match(/^Luyện thành (.+) — đan hương tràn ngập động phủ!$/))) {
    return en ? `${trName(m[1]!, lang)} refined — pill fragrance fills the cave!` : `炼成${trName(m[1]!, lang)}——丹香弥漫洞府！`;
  }
  if ((m = text.match(/^Ngươi bế quan (\d+) phút, thu được linh khí khi ly tán\.$/))) {
    return en ? `You meditated in seclusion for ${m[1]} minutes, gathering qi while away.` : `你闭关${m[1]}分钟，离开期间收获灵气。`;
  }
  if ((m = text.match(/^Thiên địa cảm ứng, (.+) khai mở (.+ Linh Căn), chính thức bước lên đạo đồ\.$/))) {
    return en
      ? `Heaven and earth resonate: ${m[1]} awakens the ${trRoot(m[2]!, lang)} and formally sets foot on the Dao path.`
      : `天地感应，${m[1]}开启${trRoot(m[2]!, lang)}，正式踏上道途。`;
  }
  if ((m = text.match(/^(.+?): (Chính xác! Tâm cảnh vững như bàn thạch, ngươi thắng lớn!|Chính xác! Ngươi giữ vững đạo tâm và nhận được phần thưởng\.|Sai rồi! Tâm ma quấy phá, cược thất bại\.|Sai rồi! Tâm cảnh dao động, ngươi không nhận được phần thưởng\.)\s*(.*)$/))) {
    const Q: Record<string, [string, string]> = {
      "Chính xác! Tâm cảnh vững như bàn thạch, ngươi thắng lớn!": ["Correct! Your mind is steady as bedrock — a big win!", "正确！心境稳如磐石，你大获全胜！"],
      "Chính xác! Ngươi giữ vững đạo tâm và nhận được phần thưởng.": ["Correct! You hold firm to your Dao heart and receive the reward.", "正确！你守住道心，获得奖励。"],
      "Sai rồi! Tâm ma quấy phá, cược thất bại.": ["Wrong! The heart demon interferes; the wager is lost.", "错了！心魔作祟，赌注失败。"],
      "Sai rồi! Tâm cảnh dao động, ngươi không nhận được phần thưởng.": ["Wrong! Your mind wavers; you receive no reward.", "错了！心境动摇，你未获得奖励。"],
    };
    const body = Q[m[2]!]![en ? 0 : 1];
    const tail = m[3] ? ` ${trBrackets(m[3], lang)}` : "";
    return `${trContent(m[1]!, lang)}${en ? ": " : "："}${body}${tail}`;
  }
  if ((m = text.match(/^Kinh mạch thông suốt, ngươi tiến vào (.+)\.$/))) {
    return lang === "en"
      ? `Meridians cleared, you advance to ${trRealm(m[1]!, lang)}.`
      : `经脉通畅，你进阶${trRealm(m[1]!, lang)}。`;
  }
  if ((m = text.match(/^Thiên kiếp giáng lâm! Ngươi cắn răng chịu đủ chín đạo lôi đình, đột phá tới (.+)!$/))) {
    return lang === "en"
      ? `The heavenly tribulation descends! Gritting through nine bolts of lightning, you break through to ${trRealm(m[1]!, lang)}!`
      : `天劫降临！你咬牙承受九道雷霆，突破至${trRealm(m[1]!, lang)}！`;
  }
  if (text.startsWith("Cửu thiên lôi kiếp tan biến")) {
    return lang === "en"
      ? "The ninefold heavenly tribulation dissolves and the immortal gate opens wide — you have completed the Ascension Road!"
      : "九天雷劫消散，仙门大开——你已完成登仙路！";
  }
  if ((m = text.match(/^(?:Ngươi tìm được pháp bảo|Ngươi nhận được) (.+?) \((.+?)\) — mốc (\d+)\/10!$/))) {
    const name = trContent(m[1]!, lang);
    const rarity = trContent(m[2]!, lang);
    return lang === "en"
      ? `You found the artifact ${name} (${rarity}) — milestone ${m[3]}/10!`
      : `你寻得法宝${name}（${rarity}）——里程碑${m[3]}/10！`;
  }
  if ((m = text.match(/^Tâm cảnh mở ra:\s*(.+?)!$/))) {
    return lang === "en"
      ? `The mindscape opens: ${trContent(m[1]!, lang)}!`
      : `心境开启：${trContent(m[1]!, lang)}！`;
  }
  if ((m = text.match(/^Duyên lành khởi phát:\s*(.+)$/))) {
    const [core, suffix] = splitSuffix(m[1]!.trim());
    const inner = trBrackets(`${trContent(core, lang)}${suffix ? ` ${trBrackets(suffix, lang)}` : ""}`, lang);
    return (lang === "en" ? `A fortunate encounter: ` : `善缘萌发：`) + inner;
  }
  const [core, suffix] = splitSuffix(text);
  const translated = trContent(core, lang);
  return suffix ? `${translated} ${trBrackets(suffix, lang)}` : trBrackets(translated, lang);
}
