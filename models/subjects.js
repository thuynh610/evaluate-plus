class Unit {
    constructor(unitCode, title, isCore) {
        this._unitCode = unitCode;
        this._title = title;
        this._isCore = isCore;
    }

    get title() {
        return this._title
    }

    get unitCode() {
        return this._unitCode
    }

    get isCore() {
        return this._isCore
    }

    get level() {
        return this._unitCode[3]
    }

}


aerospace = [
    // Core
    new Unit( "ENG2005", "Advanced engineering mathematics",true),
    new Unit( "MAE2401", "Aerospace structures and materials",true),
    new Unit( "MAE2404", "Aerodynamics 1",true),
    new Unit( "MAE2412", "Aerospace design",true),
    new Unit( "MAE2505", "Aerospace dynamics",true),
    new Unit( "MAE3401", "Aerodynamics 2",true),
    new Unit( "MAE3404", "Flight vehicle dynamics",true),
    new Unit( "MAE3405", "Flight vehicle propulsion",true),
    new Unit( "MAE3408", "Aerospace control",true),
    new Unit( "MAE3411", "Aerospace structural mechanics",true),
    new Unit( "MAE3456", "Aerospace computational mechanics",true),
    new Unit( "MAE4404", "Aerospace practices",true),
    new Unit( "MAE4410", "Flight vehicle design",true),
    new Unit( "MAE4416", "Orbital mechanics and spaceflight dynamics",true),
    new Unit( "MAE4426", "Finite element analysis and composite structures",true),
    new Unit( "MEC4401", "Final year project",true),
    new Unit( "MEC4402", "Final year project - Thesis",true),
    // Electives
    new Unit( "MEC2407", "Electromechanics",false),
    new Unit( "ENG3101", "Engineering education placement",false),
    new Unit( "MAE3406", "Aerospace materials",false),
    new Unit( "MEC3010", "Micro and nanotechnologies: Fabrication and applications",false),
    new Unit( "MEC3416", "Machine design",false),
    new Unit( "MEC3448", "Engineering technologies",false),
    new Unit( "TRC3000", "Automation project",false),
    new Unit( "TRC3500", "Sensors and artificial perception",false),
    new Unit( "ECE4078", "Intelligent robotics",false),
    new Unit( "MAE4409", "Wing design",false),
    new Unit( "MAE4965", "Advanced aerodynamics and turbulence",false),
    new Unit( "MAE4980", "Aircraft engines",false),
    new Unit( "MEC4407", "Design project",false),
    new Unit( "MEC4418", "Control systems",false),
    new Unit( "MEC4428", "Advanced dynamics",false),
    new Unit( "MEC4447", "Computers in fluids and energy",false),
    new Unit( "MEC4459", "Wind engineering",false),
    new Unit( "TRC4200", "Engineering cyber-physical systems",false),
    new Unit( "MEC5881", "Engineering systems performance analysis",false),
    new Unit( "MEC5882", "Instrumentation, sensing and monitoring",false),
    new Unit( "MEC5883", "Mechanical systems design",false),
    new Unit( "MEC5884", "Sustainable engineering systems",false)
];
biomedical = [
    // Core
    new Unit( "ECE2111", "Signals and systems",true),
    new Unit( "CHE2161", "Mechanics of fluids",true),
    new Unit( "MEC3602", "Biomedical microsystems",true),
        new Unit( "ENG2005", "Advanced engineering mathematics",true),
    new Unit( "MCB2011", "Molecular biology and the cell",true),
    new Unit( "ECE2071", "Computer organisation and programming",true),
    new Unit( "PHY2011", "Neuroscience of communication, sensory and control systems",true),
    new Unit( "DEV2011", "Early human development from cells to tissues",true),
    new Unit( "MCB2022", "The dynamic cell",true),
    new Unit( "ECE4087", "Medical technology innovation",true),
    new Unit( "PHY2042", "Body systems physiology",true),
    new Unit( "DEV2022", "Human anatomy and development: Tissues and body systems",true),
    new Unit( "ECE2131", "Electrical circuits",true),
    new Unit( "MEC3601", "Mechanics for biomedical engineering",true),
    new Unit( "MTE3601", "Biomedical materials",true),
    new Unit( "PHY3111", "Sensory and cognitive neuroscience",true),
    new Unit( "ENG4701", "Final year project A",true),
    new Unit( "ECE4081", "Medical instrumentation",true),
    new Unit( "ECE4179", "Neural networks and deep learning",true),
        new Unit( "MEC4407", "Design project",true),
    new Unit( "ENG4702", "Final year project B",true),
    new Unit( "MEC4404", "Professional practice",true),
        new Unit( "TRC3500", "Sensors and artificial perception",true),
    new Unit( "MEC4601", "Implantable devices",true)
    // No Electives
];
chemical = [
    // core
        new Unit("ENG2005", "Advanced engineering mathematics", true),
    new Unit("CHM1011", "Chemistry 1", true),
    new Unit("CHM1051", "Chemistry 1 advanced", true),
    new Unit("CHE2164", "Thermodynamics 1", true),
    new Unit("CHE2162", "Materials and energy balances", true),
        new Unit("CHE2161", "Mechanics of fluids", true),
    new Unit("CHE2163", "Heat and mass transfer", true),
    new Unit("CHE3161", "Chemistry and chemical thermodynamics", true),
    new Unit("CHE3165", "Separation processes", true),
    new Unit("CHE3167", "Transport phenomena and numerical methods", true),
    new Unit("CHE3162", "Process control", true),
    new Unit("CHE3164", "Reaction engineering", true),
    new Unit("CHE3166", "Process design", true),
    new Unit("CHE4164", "Integrated industrial project", true),
    new Unit("CHE4701", "Final year project", true),
    new Unit("CHE4162", "Particle technology", true),
    new Unit("CHE4161", "Engineer in society", true),
    new Unit("CHE4702", "Final year project", true),
    new Unit("CHE4170", "Design project", true),
    // electives
    new Unit("CHE2166", "Introduction to process simulation", false),
    new Unit("CHE2167", "Process material selection", false),
    new Unit("CHE2871", "Biochemistry for engineers", false),
    new Unit("CHE2873", "Introduction to chemical processes", false),
    new Unit("CHE2951", "Environmental chemistry – Water", false),
        new Unit("ECE2071", "Computer organisation and programming", false),
        new Unit("ECE2131", "Electrical circuits", false),
    new Unit("MTH2232", "Mathematical statistics", false),
    new Unit("CHE3133", "Food engineering", false),
    new Unit("CHE3163", "Sustainable processing 1", false),
    new Unit("CHE3171", "Bioprocess technology", false),
    new Unit("CHE3172", "Nanotechnology and materials 1", false),
    new Unit("CHE3873", "Pilot plant project", false),
    new Unit("CHE3960", "Environmental chemistry", false),
        new Unit("ENG3101", "Engineering education placement", false),
        new Unit("TRC3500", "Sensors and artificial perception", false),
    new Unit("ENE4042", "Environmental impact and risk assessment", false),
    new Unit("CHE4171", "Biochemical engineering", false),
    new Unit("CHE4172", "Nanotechnology and materials 2", false),
    new Unit("CHE4173", "Sustainable processing 2", false),
    new Unit("ENG5002", "Engineering entrepreneurship", false),
    new Unit("CHE5321", "Advanced bioprocess technology", false),
    new Unit("CHE5322", "Advanced biochemical engineering", false),
    new Unit("CHE5881", "Advanced reaction engineering", false),
    new Unit("CHE5882", "Biomass and bio-refineries", false),
    new Unit("CHE5883", "Nanostructured membranes for separation and energy production", false),
    new Unit("CHE5884", "Process modelling and optimisation", false),
    new Unit("CHE5885", "Principles and practices for sustainable development", false),
    new Unit("CHE5889", "Food engineering and processing", false)    
];
civil = [
    // core
    new Unit("CIV2206", "Structural mechanics", true),
    new Unit("CIV2282", "Transport and traffic engineering", true),
    new Unit("CIV2263", "Water systems", true),
        new Unit("ENG2005", "Advanced engineering mathematics", true),
    new Unit("CIV2242", "Geomechanics 1", true),
    new Unit("CIV2235", "Structural materials", true),
    new Unit("CIV3248", "Groundwater and environmental geomechanics", true),
    new Unit("CIV3294", "Structural design", true),
    new Unit("CIV3285", "Engineering hydrology", true),
    new Unit("CIV3204", "Engineering investigation", true),
    new Unit("CIV3221", "Building structures and technology", true),
    new Unit("CIV3247", "Geomechanics 2", true),
        new Unit("ENG4701", "Final year project", true),
    new Unit("CIV4286", "Project management for civil engineers", true),
    new Unit("CIV4280", "Bridge design and assessment", true),
    new Unit("CIV4212", "Civil and environmental engineering practice", true),
    new Unit("CIV4287", "Road engineering", true),
    new Unit("CIV4288", "Water treatment", true),
    // electives
    new Unit("ENG1021", "Spatial communication in engineering", false),
    new Unit("CIV2283", "Civil engineering construction", false),
    new Unit("ENE2503", "Material properties and recycling", false),
    new Unit("RSE2010", "Fixed plant engineering and project management", false),
        new Unit("ENG3101", "Engineering education placement", false),
    new Unit("RSE3010", "Mine geotechnical engineering", false),
    new Unit("RSE3020", "Resource estimation", false),
    new Unit("RSE3030", "Ventilation for surface and underground spaces", false),
    new Unit("RSE3040", "Mining systems", false),
    new Unit("RSE3060", "Rock breakage", false),
    new Unit("RSE3141", "Solar energy", false),
    new Unit("RSE3241", "Hydropower", false),
    new Unit("RSE3242", "Geothermal energy", false),
    new Unit("RSE3243", "Bioenergy", false),
    new Unit("CIV4100", "Autonomous vehicle systems", false),
    new Unit("CIV4211", "Project B", false),
    new Unit("CIV4234", "Advanced structural analysis", false),
    new Unit("CIV4235", "Advanced structural design", false),
    new Unit("CIV4248", "Ground hazards engineering", false),
    new Unit("CIV4249", "Foundation engineering", false),
    new Unit("CIV4261", "Integrated urban water management", false),
    new Unit("CIV4268", "Water resources management", false),
    new Unit("CIV4283", "Transport planning", false),
    new Unit("CIV4284", "Traffic systems", false),
    new Unit("CIV4293", "Transport planning for Asian cities", false),
    new Unit("CIV5301", "Advanced traffic engineering", false),
    new Unit("CIV5302", "Traffic engineering and management", false),
    new Unit("CIV5304", "Intelligent transport systems", false),
    new Unit("CIV5314", "Planning urban mobility futures", false),
    new Unit("CIV5881", "Ground water hydraulics", false),
    new Unit("CIV5882", "Flood hydraulics and hydrology", false),
    new Unit("CIV5883", "Surface water hydrology", false),
    new Unit("CIV5884", "Water sensitive storm water design", false),
    new Unit("CIV5885", "Infrastructure dynamics", false),
    new Unit("CIV5886", "Infrastructure geomechanics", false),
    new Unit("CIV5887", "Infrastructure rehabilitation and monitoring", false),
    new Unit("CIV5888", "Advanced computational methods", false),
    new Unit("CIV5899", "Infrastructure information management", false)
];

//materials = []
mechanical = [];
software = [];
chemical = [];
civil = [];
//materials = [];
//mechanical = [];
//software = [];

/* SPENCER */
//aerospace
//biomedical 

/* MATT */
//chemical 
//civil 

//environmental
environmental = [
    //CORE
    new Unit("ENE2021", "Energy and the environment", true),
        new Unit("CHE2164", "Thermodynamics 1", true),
        new Unit("CIV2263", "Water systems", true),
        new Unit("CHE2162", "Material and energy balances ", true),
        new Unit("ENG2005", "Advanced engineering mathematics", true),
        new Unit("ENE2503", "Material properties and recycling ", true),
        new Unit("CIV3248", "Groundwater and environmental geomechanics", true),
        new Unit("CIV3285", "Engineering hydrology", true),
    new Unit("ENE3031", "Building sustainability", true),   
    new Unit("ENE3606", "The air environment", true),
    new Unit("ENE3032", "Fate and transport of contaminants", true),
    new Unit("BTX3100", "Sustainability regulation for business", true),
        new Unit("CIV4286", "Project management for civil engineers", true),
        new Unit("ENE4042", "Environment impact and risk assessment", true),
    new Unit("ENE4041", "Soil remediation and solid waste management", true),
        new Unit("CIV4212", "Civil and environmental engineering practice", true),
    new Unit("CIV4210", "Project A", true),   
    //Electives
    new Unit("ATS2548", "Environmental policy and management", false), 
    new Unit("BIO2011", "Ecology and biodiversity", false),   
    new Unit("BIO2040", "Conservation biology" , false), 
        new Unit("CIV2242", "Geomechanics 1", false), 
        new Unit("CIV2282", "Transport and traffic engineering", false), 
    new Unit("ECC2800", "Prosperity, poverty and sustainability in a globalised world", false), 
        new Unit("CHE3161", "Chemistry and chemical thermodynamics ", false), 
        new Unit("CHE3163", "Sustainable processing 1 ", false), 
        new Unit("CHE3165", "Separation processes ", false), 
        new Unit("CHE3166", "Process design", false),
        new Unit("CIV3204", "Engineering investigation", false), 
        new Unit("CIV4210", "ProjectA", false),
        new Unit("CIV3247", "Geomechanics 2", false),
        new Unit("ENG3101", "Engineering education placement", false),
        new Unit("RSE3020", "Resource estimation", false),
        new Unit("RSE3030", "Ventilation for surface and underground spaces", false),
        new Unit("RSE3040", "Mining systems", false),
        new Unit("RSE3060", "Rock breakage", true),
        new Unit("RSE3141", "Solar energy", true),
        new Unit("RSE3241", "Hydropower", true),
        new Unit("RSE3243", "Bioenergy ", true),
        new Unit("CIV4211", "Project B", true),
        new Unit("CIV4248", "Ground hazards engineering", true),
        new Unit("CIV4249", "Foundation engineering", true),
        new Unit("CIV4261", "Integrated urban water management", true),
        new Unit("CIV4268", "Water resources management", true),
        new Unit("CIV4283", "Transport planning", true),
        new Unit("CIV4284", "Traffic systems", true),
    new Unit("MTE4593", "Materials and sustainability", true),
];

// Electrical and Computer Systems Engineering
electrrical_and_comp_sys = [
    //CORE
        new Unit("ECE2071", "Computer organisation and programming", true),
        new Unit("ECE2131", "Electrical circuits ", true),
        new Unit("ENG2005", "Advanced engineering mathematics", true),
    new Unit("ECE2072", "Digital systems", true),
        new Unit("ECE2111", "Signals and systems", true),
    new Unit("ECE2191", "Probability models in engineering", true),
    new Unit("ECE3073", "Computer systems", true),
    new Unit("ECE3141", "Information and networks", true),
    new Unit("ECE3161", "Analogue electronics", true),   
    new Unit("ECE3091", "Engineering design", true),
    new Unit("ECE3121", "Engineering electromagnetics", true),
    new Unit("ECE4094", "Project A", true),
    new Unit("ECE3051", "Electrical energy systems", true),
    new Unit("ECE4095", "Project B", true),
    new Unit("ECE4132", "Control system design", true),
    new Unit("ECE4099", "Professional practice", true),
    //Elective
    new Unit("TRC2001", "Introduction to systems engineering", false),
    new Unit("ECE3093", "Optimisation estimation and numerical methods", false),
        new Unit("ENG3101", "Engineering education placement", false),
        new Unit("RSE3141", "Solar energy", false),
        new Unit("TRC3500", "Sensors and artificial perception", false),
    new Unit("ECE4032", "Advanced control", false),
    new Unit("ECE4033", "Industrial instrumentation and measurement technologies", false),
    new Unit("ECE4042", "Communications theory", false),
    new Unit("ECE4043", "Optical communications", false),
    new Unit("ECE4044", "Telecommunications protocols", false),
    new Unit("ECE4045", "Network performance", false),
    new Unit("ECE4053", "Power system analysis", false),
    new Unit("ECE4055", "Power electronic converters", false),
    new Unit("ECE4058", "Electrical energy - high voltage engineering", false),
    new Unit("ECE4063", "Large scale digital design", false),
    new Unit("ECE4076", "Computer vision", false),
        new Unit("ECE4078", "Intelligent robotics", false),
        new Unit("ECE4081", "Medical instrumentation", false),
    new Unit("ECE4086", "Medical imaging technology", false),
        new Unit("ECE4087", "Medical technology innovation", false),
    new Unit("ECE4122", "Advanced electromagnetics", false),
    new Unit("ECE4146", "Multimedia technologies", false),
        new Unit("ECE4179", "Neural networks and deep learning", false),
    new Unit("ECE4808", "Organic electronics and micro devices", false),
    new Unit("ECE4809", "Solid state lighting", false),
    new Unit("ECE4810", "Internet of things: Communication, data and security", false),
    new Unit("ENG4700", "Engineering technology for biomedical imaging and sensing", false),
    new Unit("TRC4901", "Artificial intelligence for engineers", false),
    new Unit("ECE5156", "Advanced power electronics", false),
    new Unit("ECE5881", "Real-time system design", false),
    new Unit("ECE5882", "Advanced electronics design", false),
    new Unit("ECE5883", "Advanced signal processing", false),
    new Unit("ECE5884", "Wireless communications", false),
    new Unit("ECE5886", "Smart grids", false),
]

/* LIAM */
//materials 
materials = [
    // core
    
        new Unit("ENG2005", "Advanced engineering mathematics"),
    new Unit("MTE2101", "Atomic-scale structure of materials", true),
    new Unit("MTE2102", "Phase equilibria and phase transformations", true),
    new Unit("MTE2103", "Mechanical properties of materials", true),
    new Unit("MTE2201", "Polymers", true),
    new Unit("MTE2202", "Functional materials 1", true),
    new Unit("MTE4101", "Materials in a complex world 3: Design, build and create", true),
    new Unit("MTE4102", "Advanced materials processing and manufacturing", true),
    new Unit("MTE4201", "Materials in a complex world 4: Impact in society", true),
    new Unit("MTE4525", "Project 1", true),
    new Unit("MTE4526", "Project 2", true),
    
    // elective
        new Unit("ENG3101", "Engineering education placement", false),
    new Unit("MTE3204", "Biomaterials 1", false),
        new Unit("ENG4700", "Engineering technology for biomedical imaging and sensing", false),
    new Unit("MTE4590", "Modelling of materials", false),
    new Unit("MTE4592", "Advanced ceramics and applications", false),
        new Unit("MTE4593", "Materials and sustainability", false),
    new Unit("MTE4594", "Engineering alloy design, processing and selection", false),
    new Unit("MTE4595", "Corrosion mechanisms and protection methods", false),
    new Unit("MTE4596", "Biomaterials 2", false),
    new Unit("MTE4597", "Engineering with nanomaterials", false),
    new Unit("MTE4598", "Electron microscopy", false),
    new Unit("MTE5881", "Applied crystallography in advanced materials characterisation", false),
    new Unit("MTE5882", "Advanced polymeric materials", false),
    new Unit("MTE5883", "Environmental durability and protection of metals and engineering materials", false),
    new Unit("MTE5884", "Materials for energy technologies", false),
    new Unit("MTE5885", "Biomaterials and biomechanics", false),
    new Unit("MTE5886", "Additive manufacturing of metallic materials", false),
    new Unit("MTE5887", "Additive manufacturing of polymeric and functional materials", false)
]
//mechanical 
mechanical = [
    // core
        new Unit("ENG2005", "Advanced engineering mathematics"),
    new Unit("MEC2401", "Dynamics 1", true),
    new Unit("MEC2402", "Design methods", true),
    new Unit("MEC2403", "Mechanics of materials", true),
    new Unit("MEC2404", "Mechanics of fluids", true),
    new Unit("MEC2405", "Thermodynamics", true),
    new Unit("MEC3416", "Machine design", true),
    new Unit("MEC3451", "Fluid mechanics 2", true),
    new Unit("MEC3453", "Dynamics 2", true),
    new Unit("MEC3455", "Solid mechanics", true),
    new Unit("MEC3456", "Engineering computational analysis", true),
    new Unit("MEC3457", "Systems and control", true),
    new Unit("MEC4401", "Final year project", true),
    new Unit("MEC4402", "Final year project - Thesis", true),
        new Unit("MEC4404", "Professional practice", true),
        new Unit("MEC4407", "Design project", true),
    new Unit("MEC4408", "Thermodynamics and heat transfer", true),
    new Unit("MEC4426", "Computer-aided design", true),

    // elective
        new Unit("ECE2131", "Electrical circuits", false),
    new Unit("MAE2505", "Aerospace dynamics", false),
        new Unit("TRC2001", "Introduction to systems engineering", false),
        new Unit("ENG3101", "Engineering education placement", false),
    new Unit("MEC3010", "Micro and nanotechnologies: Fabrication and applications", false),
    new Unit("MEC3488", "Engineering Technologies", false),
    new Unit("MEC3458", "Experimental project", false),
    new Unit("MEC3459", "Materials selection for engineering design", false),
        new Unit("RSE3030", "Ventilation for surface and underground spaces", false),
        new Unit("RSE3241", "Hydropower", false),
    new Unit("TRC3000", "Automation project", false),
        new Unit("TRC3500", "Sensors and artificial perception", false),
        new Unit("ECE4179", "Neural networks and deep learning", false),
        new Unit("ENG4700", "Engineering technology for biomedical imaging and sensing", false),
    new Unit("MEC4418", "Control systems", false),
    new Unit("MEC4425", "Micro/nano solid and fluid mechanics", false),
    new Unit("MEC4428", "Advanced dynamics", false),
    new Unit("MEC4444", "Industrial noise and control", false),
    new Unit("MEC4446", "Composite structures", false),
    new Unit("MEC4447", "Computers in fluids and energy", false),
    new Unit("MEC4456", "Robotics", false),
    new Unit("MEC4459", "Wind engineering", false),
    new Unit("TRC4200", "Engineering cyber-physical systems", false),
    new Unit("TRC4800", "Robotics", false),
    new Unit("MEC5881", "Engineering systems performance analysis", false),
    new Unit("MEC5882", "Instrumentation, sensing and monitoring", false),
    new Unit("MEC5883", "Mechanical systems design", false),
    new Unit("MEC5884", "Sustainable engineering systems", false),
    new Unit("MEC5885", "Energy efficiency and sustainability engineering", false),
    new Unit("MEC5888", "Renewable energy systems", false),
    new Unit("MEC5891", "Design for additive manufacturing", false)
];

//software 
software = [
    // core
    new Unit("MAT1830", "Discrete mathematics for computer science", true),
    new Unit("FIT2004", "Algorithms and data structures", true),
    new Unit("FIT2085", "Introduction to computer science for engineers", true),
    new Unit("FIT2099", "Object oriented design and implementation", true),
    new Unit("FIT2100", "Operating systems", true),
    new Unit("FIT2101", "Software engineering process and management", true),
    new Unit("FIT2107", "Software quality and testing", true),
    new Unit("FIT3077", "Software engineering: Architecture and design", true),
    new Unit("FIT3159", "Computer architechture", true),
    new Unit("FIT3170", "Software engineering practice", true),
    new Unit("FIT3171", "Databases", true),
    new Unit("FIT4003", "Softawre engineering research project", true),
    new Unit("FIT4165", "Computer netwroks", true),
    new Unit("FIT4002", "Software engineering industry experience studio project", true),
    new Unit("FIT4042", "Industry-based learning", true),

    //elective
        new Unit("ENG3101", "Engineering education placement", false),
    new Unit("FIT3003", "Business intelligence and data warehousing", false),
    new Unit("FIT3031", "Network security", false),
    new Unit("FIT3080", "Intelligent systems", false),
    new Unit("FIT3094", "Artificial life, artificial intelligence and virtual environments", false),
    new Unit("FIT3134", "Entrepreneurship", false),
    new Unit("FIT3138", "Real time enterprise systems", false),
    new Unit("FIT3139", "Computational modelling and simulation", false),
    new Unit("FIT3142", "Distributed computing", false),
    new Unit("FIT3143", "Parallel computing", false),
    new Unit("FIT3146", "Maker lab", false),
    new Unit("FIT3152", "Data analytics", false),
    new Unit("FIT3154", "Advanced data analysis", false),
    new Unit("FIT3155", "Advanced data structures and algorithms", false),
    new Unit("FIT3157", "Advanced web design", false),
    new Unit("FIT3168", "IT forensics", false),
    new Unit("FIT3169", "Immersive environments", false),
    new Unit("FIT3173", "Software security", false),
    new Unit("FIT3175", "Usability", false),
    new Unit("FIT3176", "Advanced database design", false),
    new Unit("FIT3178", "Advanced mobile applications", false),
    new Unit("FIT3179", "Data Visualisation", false),
    new Unit("FIT4005", "Research methods in information technology", false),
    new Unit("FIT5003", "Software security", false),
    new Unit("FIT5032", "Internet application development", false),
    new Unit("FIT5037", "Network security", false),
    new Unit("FIT5042", "Enterprise application development on the web", false),
    new Unit("FIT5046", "Mobile and distributed computing systems", false),
    new Unit("FIT5124", "Advanced topics in security", false),
    new Unit("FIT5129", "Enterprise IT security – planning, operations and management ", false),
    new Unit("FIT5133", "Enterprise architecture and management", false),
    new Unit("FIT5137", "Advanced database technology", false),
    new Unit("FIT5138", "Advanced software engineering", false),
    new Unit("FIT5140", "Advanced mobile systems ", false),
    new Unit("FIT5145", "Introduction to data science ", false),
    new Unit("FIT5063", "Information and computer security", false),
    new Unit("FIT5166", "Information retrieval systems", false),
    new Unit("FIT5201", "Machine learning", false),
    new Unit("FIT5202", "Data processing for big data", false),
    new Unit("FIT5214", "Blockchain", false),
    new Unit("FIT5215", "Deep learning", false),
    new Unit("FIT5216", "Modelling discrete optimisation problems ", false),
    new Unit("FIT5217", "Natural language processing", false),
    new Unit("FIT5218", "Human-centric AI ", false),
    new Unit("FIT5219", "Advanced learning and cognitive systems", false),
    new Unit("FIT5220", "Solving discrete optimisation problems", false),
    new Unit("FIT5221", "Intelligent image and video analysis ", false),
    new Unit("FIT5222", "Planning and automated reasoning", false),
    new Unit("FIT5223", "IT forensics", false),
    new Unit("FIT5224", "Smart contracts", false),
    new Unit("FIT5255", "Cloud computing and security", false),
];

/* TIM */
//resources_and_mining
resources_and_mining = [
    
    // cores
    new Unit("MAT1830", "Discrete mathematics for computer science", true),
    new Unit("MAT1830", "Discrete mathematics for computer science", true),
    new Unit("MAT1830", "Discrete mathematics for computer science", true),
    new Unit("MAT1830", "Discrete mathematics for computer science", true),
    new Unit("MAT1830", "Discrete mathematics for computer science", true),

    // electives
    new Unit("MAT1830", "Discrete mathematics for computer science", false),
]

//resources_and_renewable_energy 
resources_and_renewable_energy = [];

//robotics_and_mechatronics 
robotics_and_mechatronics = [];
