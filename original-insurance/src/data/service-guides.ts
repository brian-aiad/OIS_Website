export const guides: Record<
  string,
  {
    label: string;
    headline: string;
    intro: string;
    overview: string;
    summary: string;
    checklist: string[];
    coverage: { title: string; text: string }[];
  }
> = {
  auto: {
    label: 'Auto insurance in Downey, CA',
    headline: 'Auto insurance for your everyday miles.',
    intro:
      'A commute, a school run, a weekend away. Compare auto insurance with an independent Downey broker who takes the time to understand how you drive.',
    overview: 'Start with the coverage. Then compare the price.',
    summary:
      'An auto quote is only useful when the details are right. We review your drivers, vehicles, use, mileage, limits, and deductibles before comparing available carrier options.',
    checklist: [
      'Driver information and driving history',
      'Vehicle year, make, model, or VIN',
      'Current declarations page, if available',
      'Estimated mileage and vehicle use',
      'Lender requirements for a financed or leased car',
    ],
    coverage: [
      {
        title: 'Liability',
        text: 'Helps address covered injuries and property damage you cause to others, up to your policy limits.',
      },
      {
        title: 'Comprehensive & collision',
        text: 'Consider protection for your own vehicle, with separate deductibles and covered causes of loss.',
      },
      {
        title: 'Uninsured motorist',
        text: 'Ask how available uninsured and underinsured motorist options fit your needs.',
      },
      {
        title: 'Other policy options',
        text: 'Review available rental reimbursement, roadside assistance, and carrier-specific options.',
      },
    ],
  },
  home: {
    label: 'Home & renters insurance in Downey, CA',
    headline: 'Home & renters insurance that fits your place.',
    intro:
      'Homeowners, renters, and condo insurance built around the details of your property and belongings. Let’s compare what fits your home—not just your address.',
    overview: 'Understand what your home policy covers.',
    summary:
      'Your home’s replacement cost, construction, roof, claims history, and coverage choices help shape the quote. We review the available options and explain the limits and exclusions.',
    checklist: [
      'Property address and occupancy',
      'Construction, roof, and renovation details',
      'Current declarations page, if available',
      'Mortgage or landlord insurance requirements',
      'Details of valuables or special coverage needs',
    ],
    coverage: [
      {
        title: 'Dwelling & other structures',
        text: 'Review rebuilding limits for your home and applicable structures, subject to covered losses and policy terms.',
      },
      {
        title: 'Personal belongings',
        text: 'Compare personal-property limits, deductibles, and how a policy values a covered loss.',
      },
      {
        title: 'Liability & loss of use',
        text: 'Discuss personal liability and additional living expenses when a covered loss affects your home.',
      },
      {
        title: 'Renters & condo options',
        text: 'Your coverage needs differ from the building owner’s policy. We can help review those differences.',
      },
    ],
  },
  sr22: {
    label: 'SR-22 insurance in Downey, CA',
    headline: 'SR-22 insurance and filing help.',
    intro:
      'An SR-22 requirement can feel confusing. We help you compare qualifying policies and understand the insurer’s filing process, with your DMV requirements in view.',
    overview: 'What an SR-22 filing means for you.',
    summary:
      'An SR-22 is proof of financial responsibility filed by an insurer—not a separate type of insurance policy. We help you understand the available policy options and the steps that depend on your carrier and the DMV.',
    checklist: [
      'Your DMV or court notice, if available',
      'Driver’s license or identification details',
      'Vehicle VIN or registration, if you own a car',
      'Your current policy, if you have one',
      'The dates and requirements in your notice',
    ],
    coverage: [
      {
        title: 'Review the requirement',
        text: 'Your DMV or court notice determines what you need. Share the paperwork so the quote addresses the situation.',
      },
      {
        title: 'Compare eligible carriers',
        text: 'We review policy price, limits, any filing charge, and the carrier’s binding requirements.',
      },
      {
        title: 'Confirm the filing',
        text: 'A qualifying insurer submits the proof after the necessary policy requirements are met.',
      },
      {
        title: 'Verify with the DMV',
        text: 'Filing alone does not guarantee reinstatement. Confirm your driving status and any remaining requirements directly with the DMV.',
      },
    ],
  },
  'no-license': {
    label: 'Non-standard license auto insurance',
    headline: 'Auto insurance without a standard license.',
    intro:
      'No traditional California license? Tell us who owns the vehicle, who actually drives, and what documents are available. Eligibility depends on the carrier and your circumstances.',
    overview: 'Who may have coverage options?',
    summary:
      'Some insurers may consider foreign-license holders or non-driving vehicle owners with a different licensed primary driver. Every owner, household member, and actual driver must be disclosed accurately.',
    checklist: [
      'Available identification and license documents',
      'Vehicle ownership and registration information',
      'The actual primary driver’s details',
      'Household members and vehicle use',
      'Current coverage or relevant DMV paperwork',
    ],
    coverage: [
      {
        title: 'Foreign-license holders',
        text: 'Carrier acceptance, documentation, translations, and residency requirements vary.',
      },
      {
        title: 'Non-driving vehicle owners',
        text: 'Some carriers may consider an owner who does not drive, with a properly disclosed licensed primary driver.',
      },
      {
        title: 'Households with different drivers',
        text: 'The application needs an accurate picture of who owns, uses, and has access to the vehicle.',
      },
      {
        title: 'Identification questions',
        text: 'Call with the documents you have. An ITIN or other identification does not itself guarantee eligibility or replace a driver’s license.',
      },
    ],
  },
  commercial: {
    label: 'Commercial auto insurance in Downey, CA',
    headline: 'Commercial auto insurance for your work vehicles.',
    intro:
      'One work truck or a growing fleet. Let’s review your vehicles, drivers, operations, and contract requirements before comparing commercial auto coverage.',
    overview: 'Match the policy to how you use the vehicle.',
    summary:
      'A contractor’s pickup, a delivery van, and a passenger vehicle used for business can create different coverage needs. Tell us how each vehicle is used so we can approach appropriate carriers.',
    checklist: [
      'Business name and description of operations',
      'Vehicle schedule, VINs, and garaging addresses',
      'Driver information and driving records',
      'Travel radius, cargo, and any for-hire use',
      'Contracts, certificates, and filing requirements',
    ],
    coverage: [
      {
        title: 'Business auto liability',
        text: 'Review limits for covered injuries and damage arising from business vehicle use.',
      },
      {
        title: 'Physical damage',
        text: 'Compare available comprehensive and collision options for the vehicles on the policy.',
      },
      {
        title: 'Hired & non-owned auto',
        text: 'Ask about business liability involving rented vehicles or employees’ personal vehicles used for work.',
      },
      {
        title: 'Specialized operations',
        text: 'Delivery, for-hire, NEMT, food trucks, and other uses require a carrier-specific review. Availability varies.',
      },
    ],
  },
};
