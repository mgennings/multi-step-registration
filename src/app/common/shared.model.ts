export interface Steps {
    title: string;
    route: string;
    content: string;
    progress: number;
}

export type StepType = 'register' | 'stepOne' | 'stepTwo' | 'stepThree' | 'confirm';

export interface UserDetails {
    name: {
        first: string;
        last: string;
    };
    company: string;
    age: string;
    email: string;
    phone: string;
    linkedin?: string;
    address: {
        street: string;
        unit?: string;
        city: string;
        state: string;
        zip: string;
    };
}

export const StepContent = [
    {
        title: 'Register',
        route: 'register',
        content: 'Begin your journey with us by entering your information.',
        progress: 0,
    },
    {
        title: 'Step 1: Basic Information',
        route: 'step-one',
        content: 'Enter your name, company, and age range below.',
        progress: 0,
    },
    {
        title: 'Step 2: Contact Information',
        route: 'step-two',
        content: 'Enter your contact information below.',
        progress: 33,
    },
    {
        title: 'Step 3: Account Information',
        route: 'step-three',
        content: 'Enter your address details below.',
        progress: 66,
    },
    {
        title: 'Complete!',
        route: 'confirm',
        content: "That's it! You're all set to go!",
        progress: 100,
    },
];

export const States = [
    'AK - Alaska',
    'AL - Alabama',
    'AR - Arkansas',
    'AS - American Samoa',
    'AZ - Arizona',
    'CA - California',
    'CO - Colorado',
    'CT - Connecticut',
    'DC - District of Columbia',
    'DE - Delaware',
    'FL - Florida',
    'GA - Georgia',
    'GU - Guam',
    'HI - Hawaii',
    'IA - Iowa',
    'ID - Idaho',
    'IL - Illinois',
    'IN - Indiana',
    'KS - Kansas',
    'KY - Kentucky',
    'LA - Louisiana',
    'MA - Massachusetts',
    'MD - Maryland',
    'ME - Maine',
    'MI - Michigan',
    'MN - Minnesota',
    'MO - Missouri',
    'MS - Mississippi',
    'MT - Montana',
    'NC - North Carolina',
    'ND - North Dakota',
    'NE - Nebraska',
    'NH - New Hampshire',
    'NJ - New Jersey',
    'NM - New Mexico',
    'NV - Nevada',
    'NY - New York',
    'OH - Ohio',
    'OK - Oklahoma',
    'OR - Oregon',
    'PA - Pennsylvania',
    'PR - Puerto Rico',
    'RI - Rhode Island',
    'SC - South Carolina',
    'SD - South Dakota',
    'TN - Tennessee',
    'TX - Texas',
    'UT - Utah',
    'VA - Virginia',
    'VI - Virgin Islands',
    'VT - Vermont',
    'WA - Washington',
    'WI - Wisconsin',
    'WV - West Virginia',
    'WY - Wyoming',
];

export const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
export const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
