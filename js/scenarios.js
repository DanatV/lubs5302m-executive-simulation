/* Authored fictional teaching scenarios. Amounts are pounds; intake is annual. */
window.SIM = (() => {
  const version = '2.1.0';
  const baseline = {enrolments:2000,rank:96,experience:65};
  const categories = ['QS-related improvement','Staff and technology','Social media','Scholarships and bursaries'];
  const packages = {
    A:{name:'Reputation and visibility',allocations:[3000000,0,1000000,1000000],interim:{enrolments:2160,rank:99,experience:66,narrative:'Reputation strengthens and visibility improves, but teaching capacity remains stretched.'}},
    B:{name:'Teaching and visibility',allocations:[0,3000000,1000000,1000000],interim:{enrolments:2240,rank:110,experience:78,narrative:'Stronger teaching and engagement support recruitment; financial support remains limited.'}},
    C:{name:'Teaching and affordability',allocations:[0,3000000,0,2000000],interim:{enrolments:2320,rank:110,experience:80,narrative:'Affordability and teaching support conversion; limited promotional activity leaves some strengths less visible.'}},
    D:{name:'Reach and affordability',allocations:[0,2000000,1000000,2000000],interim:{enrolments:2800,rank:105,experience:70,narrative:'Financial support and outreach deliver the largest initial intake, but limited staffing creates pressure.'}}
  };
  const rows = [
    ['A1','Continue existing research and reputation projects',0,2200,91,66,'Strongest ranking protection, but little relief for affordability or teaching pressure.'],
    ['A2','Additional taster lectures and targeted campaigns',2,2280,92,64,'Greater conversion increases pressure on unchanged teaching capacity.'],
    ['A3','Extend the existing bursary scheme',3,2320,92,65,'Financial support improves conversion; tutorial capacity remains constrained.'],
    ['B1','Add tutorial capacity and teaching support',1,2280,102,84,'Experience improves substantially, but the ranking threshold weakens recruitment momentum.'],
    ['B2','Refine social media and offer-holder engagement',2,2360,102,76,'Engagement partly offsets lost ranking visibility, with greater pressure on provision.'],
    ['B3','Extend the existing bursary scheme',3,2400,102,78,'Better affordability offsets some ranking-related recruitment risk.'],
    ['C1','Expand personal tutorial staffing',1,2400,102,88,'Strong student support and experience; growth remains measured.'],
    ['C2','Improve interactive learning technology and delivery',1,2440,102,85,'Teaching capacity scales, though adoption and staff training remain management challenges.'],
    ['C3','Extend the existing bursary scheme',3,2480,102,79,'More students enrol, but the additional volume absorbs some teaching gains.'],
    ['D1','Strengthen the existing limited staffing programme',1,2480,102,78,'Capacity catches up with demand, though the institution remains outside the top 100.'],
    ['D2','Extend campaigns and taster activities',2,2520,102,65,'Recruitment remains above baseline but below the first cycle; promotional success exposes an experience gap.'],
    ['D3','Extend the existing bursary scheme',3,2560,102,67,'Highest final intake and greater financial support, accompanied by substantial capacity pressure.']
  ];
  const followups = Object.fromEntries(rows.map(([id,name,category,enrolments,rank,experience,narrative])=>[id,{id,name,category,cost:500000,outcome:{enrolments,rank,experience,narrative}}]));
  const reflections = ['Write a short reflection section on the exercise. Structure it around the three key questions:'];
  const reflectionQuestions = [
    'Were your interventions successful? Provide evidence from the simulation to back your overall assessment.',
    'Which elements of the random forest model (e.g., overall predictive accuracy, feature importance scores) influenced your decision the most?',
    'Have the outcomes of your intervention met your expectations? If outcomes went against the random forest prediction, what could have influenced that?'
  ];
  const caseText = [
    "Northbridge University is a fictional UK university ranked 96th in the simulated QS world ranking. Its executive team is preparing a two-year strategy for taught postgraduate recruitment.",
    "The university receives 8,000 eligible Master's offer holders each year. Currently, 2,000 accept and enrol, giving a conversion rate of 25%. For simplicity, the simulation uses a standard annual tuition fee of £24,000.",
    "Northbridge has a recognisable international reputation, but its place in the top 100 is vulnerable. Its social media activity is inconsistent, interactive teaching varies across programmes, and personal tutorial provision is stretched. Competitors are expanding financial support.",
    "The governing body has authorised a £5 million strategic investment package for the first recruitment cycle. A further £500,000 will become available for a smaller adjustment in the second cycle. These are additional strategic funds; ordinary university operations are outside the exercise.",
    "Your team acts as the university executive board. You must interpret an analysis of synthetic recruitment data, select an affordable and operationally feasible investment package, respond to the first year's consequences, and explain your final strategy.",
    "Your objectives are to consider recruitment, affordability, the student experience and longer-term institutional resilience. There is no single overall score or automatically correct strategy."
  ];
  const disclosure = 'All universities, records, rankings, financial figures and outcomes in this activity are fictional teaching material. The model estimates patterns in synthetic historical data; it does not establish what an investment will cause.';
  const event = "The first recruitment cycle has closed. Competitors have increased their financial support, and the next recruitment market is becoming more price-sensitive. A forthcoming ranking update also puts pressure on universities near the top-100 boundary. The board has released a final £500,000 for one targeted adjustment.";
  return {version,baseline,categories,packages,followups,reflections,reflectionQuestions,caseText,disclosure,event,offers:8000};
})();
