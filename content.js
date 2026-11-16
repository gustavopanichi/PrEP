/* All copy comes from "PrEP Empathy Journey Microsite Copy – DRAFT" (Nov 11 2026).
   Block types inside an insight:
   - quote:  { t:"quote", kind:"patient"|"hcp", label, text?, items:[{ intro?, q, attr? }] }
   - note:   { t:"note", label, text }
   - gilead: { t:"gilead", text }                                                      */

window.PHASES = [
  {
    id: "before-relevance",
    num: null,
    label: "Before Relevance",
    img: "assets/phase0-v3.jpg",
    heading: "I don’t see myself here.",
    summary:
      "PrEP is something I’ve heard of, but it doesn’t feel like something for me. What I’ve seen and heard about it doesn’t reflect my life, my relationships, or how I see myself. Before I can even consider PrEP, I have to recognize that I belong in the picture.",
    happening: [
      ["Encountering PrEP", "She sees or hears about PrEP, but the people and situations depicted don't reflect her own life."],
      ["Considering whether to ask", "She may have questions about PrEP but doesn't actively seek out information or bring it up with others."],
      ["Navigating routine healthcare", "She attends regular healthcare appointments where PrEP isn't discussed or offered."]
    ],
    insights: [
      {
        title: "PrEP can be visible without feeling personally relevant.",
        body: [
          "For many Black cis women, PrEP’s strongest associations are with gay men, rather than with their own health, relationships, or everyday lives. When the people and experiences represented in PrEP communications don't resemble their own, women may never reach the point of asking whether protection could benefit them."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "I usually thought it was more of a gay man thing. I didn’t have it on my radar." }] },
          { t: "note", label: "Where experiences diverge", text: "For many White MSM, PrEP is already woven into social and dating culture. Friends, partners, and community have helped make it familiar, sometimes long before it becomes a personal decision. For Black cis women, that same visibility can reinforce the perception that PrEP belongs to someone else's world." },
          { t: "gilead", text: "Make Black cis women unmistakably visible in PrEP communications, not as an afterthought, but as an audience in their own right. Show PrEP as a normal, legitimate choice within women's everyday lives, without relying on a risk narrative to explain why they might consider it." }
        ]
      },
      {
        title: "Even curiosity about PrEP can feel like something I need to keep private.",
        body: [
          "For some women, PrEP carries assumptions about sexual behavior, infidelity, and the state of their relationships. Simply asking questions can feel revealing, inviting others to draw conclusions about their lives. Exploring PrEP privately allows women to consider whether it might be right for them without having to explain or defend their curiosity."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "There’s a judgmental part of it: ‘Why would she need to get on PrEP if she’s not living a certain type of life?’" }] },
          { t: "note", label: "Where experiences diverge", text: "Latino MSMs also described negotiating the social meaning of PrEP, including religious beliefs and cultural expectations around sexuality. Among Black MSM, questions of trust in healthcare can create another layer of distance. White MSMs were most likely to describe PrEP as an expected and natural choice within their community and for themselves." },
          { t: "gilead", text: "Create discreet, low-pressure pathways into PrEP exploration. Telehealth can play an important role by allowing women to ask questions, consider options, and connect with care outside the visibility of their social environment." }
        ]
      },
      {
        title: "HCP hesitation can reinforce the idea that PrEP isn’t for me.",
        body: [
          "Women may encounter healthcare providers regularly without PrEP entering the conversation. In primary care and OB/GYN settings, limited familiarity and assumptions about who needs PrEP can leave it unmentioned. Even HCPs who are familiar with PrEP describe tiptoeing around the conversation with women, anticipating sensitivities around relationships, trust, and infidelity."
        ],
        blocks: [
          { t: "quote", kind: "hcp", label: "HCP perspective…", items: [{ q: "When we’re trying to talk to a cis female who doesn’t know if her partner is monogamous, I can’t just come in hot like, which PrEP do you want? It’s a delicate dance around people’s relationships and trust. I know there’s stigma. I know there’s fear.", attr: "HCP, NP" }] },
          { t: "gilead", text: "Help HCPs introduce PrEP proactively and without judgment, making it a routine part of preventive care rather than a conversation that requires women to signal interest or disclose risk first. Allow patients to select PrEP as something they want to discuss in a pre-appointment survey to broach the topic in a low-stakes way and give HCPs a segue into the conversation." }
        ]
      }
    ]
  },

  {
    id: "relevance",
    num: "01",
    label: "Relevance",
    img: "assets/phase1-v4.jpg",
    heading: "Until something shifts my perspective.",
    summary:
      "Something changes how I see my life and how I want to care for myself. Maybe it's a change in relationship status, a health milestone, or a new sense of what matters to me. I begin to recognize that PrEP could have a place in my story, for reasons that are my own.",
    happening: [
      ["Experiencing a life change", "A relationship shift, health milestone, or new priority prompts her to reconsider how she cares for herself."],
      ["Reassessing protection", "She begins thinking about what it means to take responsibility for her own health, independent of a partner's choices."],
      ["Recognizing PrEP as an option", "Through a healthcare conversation or other exposure, she begins to see PrEP as something that could fit into her life."]
    ],
    insights: [
      {
        title: "Risk isn't the only route to PrEP.",
        body: [
          "Relevance begins when something changes the status quo. Sometimes that change is an HIV or STI scare, relationship uncertainty, or a heightened sense of vulnerability. But for many women, PrEP becomes relevant through a broader reassessment of their health, priorities, or future."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "I had some bouts with high cholesterol, high blood pressure, and it felt like I was just on this path to know my health status, get healthy as I’m moving into the next phase of life. PrEP was just another step in taking care of myself, in my health regimen.", attr: "Black cis woman, oral PrEP" }] },
          { t: "note", label: "Where experiences diverge", text: "For some MSM, PrEP relevance is closely tied to sex, dating, freedom, and community. For Black women in this research, a broader health or life reset was a particularly salient route into consideration." },
          { t: "gilead", text: "Meet women at moments when they're already reconsidering how they care for themselves. Health milestones, relationship changes, and life transitions can create openings for PrEP without requiring HIV vulnerability to be the starting point." }
        ]
      },
      {
        title: "Protection can be an expression of independence.",
        body: [
          "For some Black women, taking PrEP means taking responsibility for what they can control, regardless of what another person discloses, promises, or chooses to do. This is a meaningful form of agency: choosing protection for themselves without depending on a partner's actions."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "I'm not gambling with my life anymore… for me, I did something about that.", attr: "Black cis woman, oral PrEP" }] },
          { t: "note", label: "Where experiences diverge", text: "Women often described protection as a personal choice, while MSM more frequently connected PrEP to collective protection or shared responsibility. These meanings aren't exclusive, but they suggest different emotional routes into the category." },
          { t: "gilead", text: "Reinforce women's authority to choose protection on their own terms. PrEP can be framed as an expression of self-regard, agency, and care for the life they've built." }
        ]
      },
      {
        title: "The most effective invitation doesn't require someone to see herself as 'at risk.'",
        body: [
          "A woman may want to protect her health without identifying with the language or imagery of HIV risk. When PrEP is introduced as an ordinary option within preventive care, she has room to consider it without feeling labeled or judged."
        ],
        blocks: [
          { t: "quote", kind: "hcp", label: "HCP perspective", text: "Experienced providers described the importance of making PrEP a routine, matter-of-fact conversation rather than one dependent on a patient's willingness to disclose sensitive information.", items: [{ q: "Any woman coming for contraception should immediately be offered PrEP. But I just don’t imagine it’s integrated in that way in your typical GYN practice.", attr: "HCP, NP" }] },
          { t: "gilead", text: "Create more routes into relevance. Use the emotional language of prevention, protection, and possibility so women can recognize their own reasons for considering PrEP." }
        ]
      }
    ]
  },

  {
    id: "initiation",
    num: "02",
    label: "Initiation",
    img: "assets/phase2-v4.jpg",
    heading: "I’m choosing how protection fits into my picture.",
    summary:
      "Now that PrEP feels relevant, I’m figuring out what works for me. How much control, effort, and involvement do I want? The choices I see and conversations I have shape what feels possible.",
    happening: [
      ["Exploring PrEP options", "She learns about different modalities through conversations with her HCP, with how those options are presented shaping what she considers."],
      ["Weighing what works for her", "She considers how different options would fit into her life, including demands on her time, routine, privacy, and involvement with healthcare."],
      ["Navigating access", "Insurance requirements, pharmacy processes, and other logistical barriers may influence which modality she ultimately starts."],
      ["Getting started", "She completes necessary testing, coordinates prescriptions or appointments, and begins her chosen PrEP regimen."]
    ],
    insights: [
      {
        title: "The PrEP menu isn’t always as neutral as it appears.",
        body: [
          "Modality choice is often described as patient-led, but the options that reach the patient have already been influenced by provider familiarity, clinical confidence, anticipated access barriers, and assumptions about what someone can manage. Even the way HCPs present PrEP options can change what feels innovative or desirable."
        ],
        blocks: [
          { t: "quote", kind: "hcp", label: "HCP perspective", text: "Some providers introduce options by format, grouping oral and injectable medications. Others describe the evolution of PrEP over time, which can implicitly position newer options as progress.", items: [] },
          { t: "gilead", text: "Keep the menu from narrowing before the patient gets to it. Help HCPs compare modalities around lived experience, not simply route of administration or dosing frequency." }
        ]
      },
      {
        title: "Every form of protection asks me to give something different.",
        body: [
          "Choosing PrEP isn't just choosing between pills and injections. Each option makes different demands on a person's time, attention, flexibility, privacy, and relationship with healthcare. The best fit depends on which resources someone has available and how much ongoing participation they want."
        ],
        blocks: [
          { t: "note", label: "Where patients and HCPs diverge", text: "Patients may describe less frequent dosing in terms of freedom, control, and distance from PrEP. HCPs may interpret that same distance as reduced visibility and a greater risk of losing connection to care. Where patients gain freedom, HCPs lose confidence." },
          { t: "gilead", text: "Create a shared language of fit. Help patients and HCPs discuss what control, freedom, effort, and involvement mean in everyday life. To uphold HCP confidence, create ways for HCPs to maintain visibility without adding touch-points that undermine the freedom patients value." }
        ]
      },
      {
        title: "Access barriers can make the decision for me.",
        body: [
          "A preferred modality may not be the one someone ultimately starts or stays on. Insurance approvals, pharmacy processes, and operational complexity can lead providers to begin with a more accessible option. An interim solution can become a long-term choice simply because the original preference is never revisited."
        ],
        blocks: [
          { t: "quote", kind: "hcp", label: "HCP perspective", items: [{ q: "I always start with the pill because the insurance has to go through the prior authorization process.", attr: "HCP, physician" }] },
          { t: "gilead", text: "Make access expertise easier to use across practices. Clarify payer pathways, documentation requirements, pharmacy responsibilities, and escalation processes. When a temporary option is used, create a deliberate point to revisit the patient's original preference." }
        ]
      }
    ]
  },

  {
    id: "integration",
    num: "03",
    label: "Integration",
    img: "assets/phase3-v3.jpg",
    heading: "I’m coming into focus as the noise recedes.",
    summary:
      "As PrEP becomes part of my life, I learn what it actually asks of me. I find a rhythm that works, and with experience, I begin to feel more confident that I can count on my protection. The cognitive noise fades, and I start to feel more present.",
    happening: [
      ["Adjusting to PrEP", "She experiences what her chosen modality requires in practice, from daily medication to scheduled injections, and learns how it fits into her life."],
      ["Building a routine", "She establishes ways to stay on track with medication, appointments, testing, and other ongoing care requirements."],
      ["Developing confidence", "Through experience, she begins to trust her protection and feels less need to think about PrEP constantly."],
      ["Staying connected to care", "She maintains contact with her healthcare team, whether through regular visits, testing, or less frequent check-ins, depending on her modality."]
    ],
    insights: [
      {
        title: "Knowing PrEP works and feeling I can count on it are different things.",
        body: [
          "Scientific confidence doesn't always translate immediately into emotional reassurance.",
          "People may begin PrEP believing in its efficacy while still carrying HIV-related anxiety, uncertainty about testing, or a need to confirm that protection is working for them. Confidence can develop gradually through the experience of living with PrEP, seeing that protection is dependable, and feeling less need to question it."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [
            { q: "Even after you’re on PrEP, you still kind of have this residual dread because it was built up in you for so many years.", attr: "White MSM, Yeztugo" },
            { q: "I feel like I have to trust that it's working for me, and then I've seen for myself that it's working for me.", attr: "Black cis woman, oral PrEP" }
          ] },
          { t: "note", label: "Where experiences converge", text: "A White MSM participant described continuing to experience anxiety around HIV testing despite being on PrEP. A Latino MSM participant described eventually thinking about PrEP less and less. The movement from intellectual trust to felt reassurance can take time across audiences." },
          { t: "gilead", text: "Support the transition from knowing to trusting. Clear guidance, reassurance, and supportive care experiences early in PrEP use can help confidence develop without requiring people to remain hypervigilant about protection." }
        ]
      },
      {
        title: "For women, learning to trust PrEP means proof that it will really show up.",
        body: [
          "For Black cis women, PrEP offers an especially meaningful form of security: something they can rely on regardless of what another person says or does. When personifying PrEP, women often imagined someone dependable “in their corner”: mature, consistent, reliable, and always there when needed. Notably, these descriptions were often in contrast with how they described their romantic relationships."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [
            { q: "That one person in life who has you covered…", attr: "Black cis woman, personification exercise" },
            { q: "It’s my sister: calm, dependable, quietly looking out for me.", attr: "Black cis woman, personification exercise" }
          ] },
          { t: "note", label: "Where experiences diverge", text: "When asked to personify PrEP, women often imagined a mature, reliable person beside them — someone consistently in their corner. MSM more frequently described a form of defense: a shield, armor, warrior, or force field standing between them and HIV. Both express protection, but the emotional relationships are different: one emphasizes dependable support, while the other emphasizes a protective barrier." },
          { t: "gilead", text: "Expand the emotional language of protection beyond defense. For many MSMs, PrEP means something standing between me and HIV. For women, it can represent something dependable beside them, allowing greater confidence and independence in the life they choose." }
        ]
      },
      {
        title: "The distance patients value can be exactly what worries HCPs.",
        body: [
          "Long-acting PrEP can allow people to go for extended periods without thinking about medication. For patients, that distance often represents freedom. For HCPs, fewer visits, refills, and monitoring touchpoints can mean less visibility and concerns about patients losing connection to care. This creates an important tension: the experience patients want may challenge the processes providers have relied on to feel confident in their care."
        ],
        blocks: [
          { t: "quote", kind: "hcp", label: "HCP perspective", items: [
            { q: "I would opt for the Apretude because that keeps them in care.", attr: "HCP, NP (excerpt)" },
            { q: "With orals, I had a little bit of a carrot and stick: I’m not refilling it unless you get your lab work done. With lenacapavir, at two or three months, I’ve got no leverage, I’ve got zippo.", attr: "HCP, Physician" }
          ] },
          { t: "gilead", text: "As protection requires less frequent action, give care teams new ways to maintain confidence and visibility. Lighter-touch connections, including telehealth, could preserve access, reassurance, and visibility without recreating the burden of in-person visits for patients." }
        ]
      }
    ]
  },

  {
    id: "internalization",
    num: "04",
    label: "Internalization",
    img: "assets/phase4-v3.jpg",
    heading: "The frame of my life is widening.",
    summary:
      "As protection becomes something I can depend on, it takes up less space in my mind. The attention once occupied by worry and uncertainty becomes available for intimacy, connection, spontaneity, and everything else in my life.",
    happening: [
      ["Thinking about PrEP less", "As protection becomes familiar and dependable, she spends less time worrying about HIV or mentally calculating risk."],
      ["Experiencing greater freedom", "She feels more present in intimate moments and may become more comfortable exploring relationships, intimacy, and new experiences."],
      ["Deciding what to share", "She determines whether, when, and with whom to discuss her PrEP use, including whether to involve a partner."],
      ["Making protection her own", "PrEP takes on personal meaning, whether as a source of independence, security, self-expression, or connection to a broader community."]
    ],
    insights: [
      {
        title: "Protection gives me back attention I didn't realize I was spending.",
        body: [
          "Before PrEP, HIV-related worry can occupy mental space before, during, and after sexual experiences. People find themselves assessing vulnerability, negotiating protection, or replaying decisions afterward.",
          "As confidence in PrEP grows, the ongoing distractions and mental math can recede. The experience shifts from vigilance, regret, and shame to relief, presence, and psychological freedom."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [
            { q: "To not have to do that mental math and play those exercises in the back of my mind is a huge relief.", attr: "White MSM, Apretude" },
            { q: "It does make me feel a little bit more intimate with my husband.", attr: "Black cis woman, oral PrEP (excerpt)" }
          ] },
          { t: "note", label: "Where experiences converge", text: "MSMs and cis Black women described relief from the mental calculations surrounding sex, including the freedom to be more present and spontaneous. The underlying experience of returned attention is shared, even when the meaning of that freedom differs." },
          { t: "gilead", text: "Make returned attention part of the value story. Show how protection can support greater presence in intimacy, relationships, and everyday life." }
        ]
      },
      {
        title: "Protection can create more room to be myself.",
        body: [
          "When HIV-related anxiety becomes less prominent, people experience greater freedom to pursue intimacy, connection, pleasure, and self-expression. For some, PrEP creates the confidence to explore new experiences. For others, it allows them to be more freely and authentically themselves."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [
            { q: "PrEP just awakens you more to be open, explore, try out new things. I feel alive, confident, me.", attr: "Black cis woman, oral PrEP" },
            { q: "I get to show up as my complete self.", attr: "Latino MSM, Yeztugo" }
          ] },
          { t: "note", label: "Where experiences converge", text: "Across audiences, PrEP can create greater freedom to pursue intimacy, explore new experiences, and express oneself more authentically." },
          { t: "gilead", text: "Show what protection makes possible. Give confidence, pleasure, ease, and self-expression a meaningful place in how PrEP's value is communicated." }
        ]
      },
      {
        title: "Protection can remain deeply personal, even within a relationship.",
        body: [
          "For some women, PrEP remains a private decision, even after it becomes part of their everyday lives.",
          "They may choose not to discuss it with partners because doing so could introduce unwanted questions about fidelity, trust, or the relationship itself. Privacy can preserve a woman's ownership of a health decision she has made for herself."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "I didn't even want to bring him into the conversation. He didn't even know I was taking it.", attr: "Black cis woman, oral PrEP (excerpt)" }] },
          { t: "note", label: "Where experiences diverge", text: "MSM more often described discussing PrEP openly with partners, sometimes even attending appointments together. They were also more likely to share their experiences with friends and emphasize PrEP's benefits for the broader community, rather than treating it as a private, personal choice." },
          { t: "gilead", text: "Preserve the option for PrEP to remain discreet. Consider how medication delivery, notifications, records, and ongoing support affect women's ability to maintain protection on their own terms." }
        ]
      },
      {
        title: "The meaning of protection can extend beyond the individual.",
        body: [
          "For some MSM, PrEP carries significance rooted in community history, shared experience, and collective responsibility. HIV prevention can represent honoring lives lost, preserving progress, and looking after others as well as oneself. Among Black cis women, the research more frequently emphasized self-directed protection and the independence it creates."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [{ q: "We are taking care of each other by taking care of ourselves.", attr: "White MSM, oral PrEP" }] },
          { t: "gilead", text: "Allow protection to carry multiple meanings. Self-care, independence, community, security, and possibility can coexist without needing to become a single universal promise." }
        ]
      }
    ]
  },

  {
    id: "evolution",
    num: "05",
    label: "Evolution",
    img: "assets/phase5-v3.jpg",
    heading: "My picture keeps getting fuller.",
    summary:
      "Life doesn’t stand still. PrEP becomes the backdrop to new experiences, adventures, relationships, and responsibilities. New chapters can alter what I need from protection, and over time, I can consider and reevaluate how PrEP fits within my picture.",
    happening: [
      ["Experiencing new life circumstances", "Changes in work, relationships, family responsibilities, or other priorities may alter what she needs from protection."],
      ["Reevaluating modality fit", "She considers whether her current PrEP option still works for her, potentially exploring alternatives with her HCP."],
      ["Pausing or returning to PrEP", "She may stop taking PrEP as her circumstances change, then reconsider protection when her needs shift again."]
    ],
    insights: [
      {
        title: "The right choice for me today may not be the right choice tomorrow.",
        body: [
          "Over time, people may find that they need protection to fit into their lives in different ways. A modality that felt easier in theory may become harder to manage when work, family responsibilities, travel, relationships, or access circumstances change. Evolution is an ongoing process of finding fit, rather than just persisting with an original decision indefinitely. Switching can be a sign of better fit, not weaker connection."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [
            { intro: "A Black cis woman who had previously used Yeztugo described how recurring appointments competed with work and parenting responsibilities:", q: "My job was talking about me taking off, and I have kids, so I ended up switching back to the pill because it’s something I take on my own every day.", attr: "Black cis woman, oral PrEP" },
            { intro: "A Latino MSM participant described switching away from oral PrEP after travel revealed how much attention pill management was consuming.", q: "I went to Indonesia and forgot to take my PrEP with me. I was like, well, there went my vacation. I was kicking myself. With injections, I can just exist.", attr: "Latino MSM, Yeztugo" }
          ] },
          { t: "note", label: "Where experiences converge", text: "While specific burdens differ, people across identity groups described shifts in what they wanted protection to ask of them." },
          { t: "gilead", text: "Normalize reassessment. Build opportunities into ongoing care, potentially through telehealth, to revisit modality fit, particularly when life circumstances or practical demands change." }
        ]
      },
      {
        title: "A pause doesn’t mean the journey is over.",
        body: [
          "A decision to pause may reflect changing circumstances rather than a decision to discontinue PrEP entirely. When those circumstances change again, returning to PrEP may make sense."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In their words…", items: [{ q: "As my risk profile changed again from being monogamous to having multiple partners, I decided to get back on.", attr: "White MSM, Yeztugo" }] },
          { t: "note", label: "Where experiences diverge", text: "For women, changes in relationships and privacy may introduce additional considerations around continuing or returning to protection. When a partner discovers a woman's private decision to take PrEP, continuing can become entangled with questions of trust and fidelity. Pressure to stop may have less to do with her relationship with PrEP than with her relationship with her partner." },
          { t: "quote", kind: "hcp", label: "HCP perspective", items: [{ q: "The number one reason women stop [PrEP] is a partner found out and is calling them ridiculous and saying ‘you don't trust me.’", attr: "HCP, PA" }] },
          { t: "gilead", text: "Understand what changed before treating a pause as an adherence problem. Make return feel like a natural, supported next action. Help women navigate moments when a private decision becomes visible. Provide language and support for conversations about protection that don't automatically equate PrEP with mistrust or infidelity." }
        ]
      },
      {
        title: "My relationship with PrEP can reflect my relationship with myself.",
        body: [
          "For some people, PrEP becomes more than a prevention decision. It can be one expression of how they value themselves, care for their future, and show up as the person they want to be. Changes in PrEP use may therefore have an emotional story underneath them, connected to self-worth, identity, or changing priorities."
        ],
        blocks: [
          { t: "quote", kind: "patient", label: "In her words…", items: [{ q: "If you're taking it, you care enough about yourself to not put yourself at risk.", attr: "Black cis woman, oral PrEP" }] },
          { t: "gilead", text: "Understand the person behind the behavior. Before solving for adherence or persistence, explore what may have changed in someone's circumstances, priorities, or relationship with themselves." }
        ]
      }
    ]
  }
];

window.TAKEAWAYS = {
  title: "Cross-Journey Opportunities",
  intro: [
    "Across the journey, we see PrEP move from something that feels outside my world to something I recognize, choose, and make my own. As I learn to depend on PrEP, protection can occupy less of my attention and give me more room for the people, experiences, and possibilities that matter. As my life changes, my relationship with PrEP can change too.",
    "Gilead has opportunities to help people see themselves in PrEP, make protection their own, and keep it working for the lives they’re actually living."
  ],
  heading: "Designing for the moments that matter across the PrEP journey",
  items: [
    { phase: "before-relevance", title: "Make PrEP easier to see, explore, and ask about.", bullets: [
      "Make Black cis women unmistakably visible in the PrEP category as main characters, not extras, without relying on a risk narrative to explain their relevance.",
      "Create private, low-pressure pathways to explore PrEP through telehealth and routine, judgment-free HCP conversations."
    ] },
    { phase: "relevance", title: "Meet women at moments of self-reassessment.", bullets: [
      "Introduce PrEP within broader health milestones, relationship transitions, and life resets.",
      "Expand the invitation beyond risk to self-care, independence, and protecting the lives women have built."
    ] },
    { phase: "initiation", title: "Keep patient preferences at the center of modality choice.", bullets: [
      "Equip HCPs to discuss modalities through lived experience: control, effort, privacy, and involvement.",
      "Minimize the influence of access barriers on modality choice, and create opportunities to revisit initial preferences when daily oral PrEP is used as a temporary solution."
    ] },
    { phase: "integration", title: "Build dependability without adding burden.", bullets: [
      "Help scientific confidence become emotional reassurance through clear guidance and supportive early experiences.",
      "Use lighter-touch care, including telehealth, to preserve HCP visibility and confidence while protecting patient freedom."
    ] },
    { phase: "internalization", title: "Make what protection gives back part of its value.", bullets: [
      "Show how dependable protection creates room for presence, intimacy, pleasure, and self-expression.",
      "Preserve women’s ownership of protection through discreet, flexible ongoing support."
    ] },
    { phase: "evolution", title: "Design for changing lives, not fixed decisions.", bullets: [
      "Normalize reassessment, switching, pausing, and returning as life circumstances change.",
      "Create low-friction reentry and personalized support that starts by understanding what changed."
    ] }
  ]
};
