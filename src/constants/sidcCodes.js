const echelonSizes = [
  { name: 'Undefined', value: '-' },
  { name: 'Team/Crew', value: 'A' },
  { name: 'Squad', value: 'B' },
  { name: 'Section', value: 'C' },
  { name: 'Platoon/Detachment', value: 'D' },
  { name: 'Company/Battery/Troop', value: 'E' },
  { name: 'Batallion/Squadron', value: 'F' },
  { name: 'Regiment/Group', value: 'G' },
  { name: 'Brigade', value: 'H' },
  { name: 'Division', value: 'I' },
  { name: 'Corps', value: 'J' },
  { name: 'Army', value: 'K' },
  { name: 'Army Group/Front', value: 'L' },
  { name: 'Region', value: 'M' },
  { name: 'Command', value: 'N' },
]

const sidcCodes = [
  { name: 'Unit', value: 'U-----' },
  { name: 'Combat', value: 'UC----' },
  // AIR DEFENSE
  { name: 'Air Defense', value: 'UCD---' },
  { name: 'Air Defense Missile', value: 'UCDM--' },
  { name: 'Light Air Defense Missile', value: 'UCDML-' },
  { name: 'Medium Air Defense Missile', value: 'UCDMM-' },
  { name: 'Heavy Air Defense Missile', value: 'UCDMH-' },
  { name: 'Motorized Air Defense Missile (Avenger)', value: 'UCDMLA' },
  { name: 'Short Range Air Defense', value: 'UCDS--' },
  { name: 'Chaparral', value: 'UCDSC-' },
  { name: 'Stinger', value: 'UCDSS-' },
  { name: 'Vulcan', value: 'UCDSV-' },
  { name: 'H/MAD', value: 'UCDH--' },
  { name: 'Hawk', value: 'UCDHH-' },
  { name: 'Patriot', value: 'UCDHP-' },
  { name: 'Gun Unit', value: 'UCDG--' },
  { name: 'Composite Air Defense', value: 'UCDC--' },
  { name: 'Air Defense Targeting Unit', value: 'UCDT--' },
  { name: 'Theater Missile Defense Unit', value: 'UCDO--' },
  // ARMOR
  { name: 'Armor', value: 'UCA---' },
  { name: 'Light Armor', value: 'UCATL-' },
  { name: 'Medium Armor', value: 'UCATM-' },
  { name: 'Heavy Armor', value: 'UCATH-' },
  { name: 'Recovery Armor', value: 'UCATR-' },
  { name: 'Wheeled Armor', value: 'UCAW--' },
  { name: 'Wheeled Air Assault Armor', value: 'UCAWS-' },
  { name: 'Wheeled Airborne Armor', value: 'UCAWA-' },
  { name: 'Wheeled Amphibious Armor', value: 'UCAWW-' },
  { name: 'Wheeled Amphibious Recovery Armor', value: 'UCAWWR' },
  { name: 'Light Wheeled Armor', value: 'UCAWL-' },
  { name: 'Medium Wheeled Armor', value: 'UCAWM-' },
  { name: 'Heavy Wheeled Armor', value: 'UCAWH-' },
  { name: 'Recovery Wheeled Armor', value: 'UCAWR-' },
  { name: 'Tracked Airborne Armor', value: 'UCATA-' },
  { name: 'Tracked Amphibious Armor', value: 'UCATW-' },
  { name: 'Tracked Amphibious Recovery Armor', value: 'UCATWR' },
  // ANTI-ARMOR
  { name: 'Anti-Armor', value: 'UCAA--' },
  { name: 'Airborne Anti-Armor', value: 'UCAAM-' },
  { name: 'Air Assault Anti-Armor', value: 'UCAAS-' },
  { name: 'Arctic Anti-Armor', value: 'UCAAC-' },
  { name: 'Armored Anti-Armor', value: 'UCAAA-' },
  { name: 'Armored Air Assault Anti-Armor', value: 'UCAAAS' },
  { name: 'Wheeled Armored Anti-Armor', value: 'UCAAAW' },
  { name: 'Light Anti-Armor', value: 'UCAAL-' },
  { name: 'Motorized Anti-Armor', value: 'UCAAO-' },
  { name: 'Motorized Air Assault Anti-Armor', value: 'UCAAOS' },
  { name: 'Mountain Anti-Armor', value: 'UCAAU-' },
  // AVIATION
  { name: 'Aviation', value: 'UCV---' },
  { name: 'Composite Aviation', value: 'UCVC--' },
  { name: 'Fixed Wing', value: 'UCVF--' },
  { name: 'Utility Fixed Wing', value: 'UCVFU-' },
  { name: 'Attack Fixed Wing', value: 'UCVFA-' },
  { name: 'Recon Fixed Wing', value: 'UCVFR-' },
  { name: 'Rotary Wing', value: 'UCVR--' },
  { name: 'Attack Rotary Wing', value: 'UCVRA-' },
  { name: 'Scout Rotary Wing', value: 'UCVRS-' },
  { name: 'Anti-Submarine Warfare Rotary Wing', value: 'UCVRW-' },
  { name: 'Utility Rotary Wing', value: 'UCVRU-' },
  { name: 'Light Utility Rotary Wing', value: 'UCVRUL' },
  { name: 'Medium Utility Rotary Wing', value: 'UCVRUM' },
  { name: 'Heavy Utility Rotary Wing', value: 'UCVRUH' },
  { name: 'C2 Rotary Wing', value: 'UCVRUC' },
  { name: 'Medevac Rotary Wing', value: 'UCVRUE' },
  { name: 'Mine Countermeasure Rotary Wing', value: 'UCVRM-' },
  { name: 'Search and Rescue Rotary Wing', value: 'UCVS--' },
  { name: 'Unmanned Aircraft', value: 'UCVU--' },
  { name: 'Fixed Wing Unmanned Aircraft', value: 'UCVUF-' },
  { name: 'Rotary Wing Unmanned Aircraft', value: 'UCVUR-' },
  { name: 'V/STOL', value: 'UCVV--' },
  // INFANTRY
  { name: 'Infantry', value: 'UCI---' },
  { name: 'Airborne Infantry', value: 'UCIA--' },
  { name: 'Air Assault Infantry', value: 'UCIS--' },
  { name: 'Arctic Infantry', value: 'UCIC--' },
  { name: 'Light Infantry', value: 'UCIL--' },
  { name: 'Mechanized Infantry', value: 'UCIZ--' },
  { name: 'Motorized Infantry', value: 'UCIM--' },
  { name: 'Mountain Infantry', value: 'UCIO--' },
  { name: 'Naval Infantry', value: 'UCIN--' },
  { name: 'Infantry Fighting Vehicle', value: 'UCII--' },
  // ENGINEER
  { name: 'Engineer', value: 'UCE---' },
  { name: 'Combat Engineer', value: 'UCEC--' },
  { name: 'Air Assault Combat Engineer', value: 'UCECS-' },
  { name: 'Airborne Combat Engineer', value: 'UCECA-' },
  { name: 'Arctic Combat Engineer', value: 'UCECC-' },
  { name: 'Light Combat Engineer (Sapper)', value: 'UCECL-' },
  { name: 'Medium Combat Engineer', value: 'UCECM-' },
  { name: 'Heavy Combat Engineer', value: 'UCECH-' },
  { name: 'Mechanized Combat Engineer', value: 'UCECT-' },
  { name: 'Motorized Combat Engineer', value: 'UCECW-' },
  { name: 'Mountain Combat Engineer', value: 'UCECO-' },
  { name: 'Recon Combat Engineer', value: 'UCECR-' },
  { name: 'Construction Engineer', value: 'UCEN--' },
  { name: 'Naval Construction Engineer', value: 'UCENN-' },
  // ARTILLERY (NEEDS PAA SQUARE)
  { name: 'Artillery', value: 'UCF---' },
  { name: 'Self-Propelled Artillery', value: 'UCFHE-' },
  { name: 'Air Assault Artillery', value: 'UCFHS-' },
  { name: 'Airborne Artillery', value: 'UCFHA-' },
  { name: 'Arctic Artillery', value: 'UCFHC-' },
  { name: 'Mountain Artillery', value: 'UCFHO-' },
  { name: 'Light Artillery', value: 'UCFHL-' },
  { name: 'Medium Artillery', value: 'UCFHM-' },
  { name: 'Heavy Artillery', value: 'UCFHH-' },
  { name: 'Amphibious Artillery', value: 'UCFHX-' },
  { name: 'Rocket Artillery', value: 'UCFR--' },
  { name: 'Single Rocket Launcher', value: 'UCFRS-' },
  { name: 'Self-Propelled Single Rocket Launcher', value: 'UCFRSS' },
  { name: 'Single Rocket Launcher Truck', value: 'UCFRSR' },
  { name: 'Single Rocket Launcher (Towed)', value: 'UCFRST' },
  { name: 'Multiple Rocket Launcher', value: 'UCFRM-' },
  { name: 'Self-Propelled Multiple Rocket Launcher', value: 'UCFRMS' },
  { name: 'Multiple Rocket Launcher Truck', value: 'UCFRMR' },
  { name: 'Multiple Rocket Launcher (Towed)', value: 'UCFRMT' },
  { name: 'Target Acquisition', value: 'UCFT--' },
  { name: 'Target Acquisition RADAR', value: 'UCFTR-' },
  { name: 'Target Acquisition Sound', value: 'UCFTS-' },
  { name: 'Target Acquisition Flash (Optical)', value: 'UCFTF-' },
  { name: 'Target Acquisition COLT/FIST', value: 'UCFTC-' },
  { name: 'Dismounted Target Acquisition COLT/FIST', value: 'UCFTCD' },
  { name: 'Tracked Target Acquisition COLT/FIST', value: 'UCFTCM' },
  { name: 'Target Acquisition Anglico', value: 'UCFTA-' },
  { name: 'Mortar', value: 'UCFM--' },
  { name: 'Self-Propelled Mortar (Tracked)', value: 'UCFMS-' },
  { name: 'Self-Propelled Mortar (Wheeled)', value: 'UCFMW-' },
  { name: 'Towed Mortar', value: 'UCFMT-' },
  { name: 'Airborne Towed Mortar', value: 'UCFMTA' },
  { name: 'Air Assault Towed Mortar', value: 'UCFMTS' },
  { name: 'Arctic Towed Mortar', value: 'UCFMTC' },
  { name: 'Mountain Towed Mortar', value: 'UCFMTO' },
  { name: 'Amphibious Mortar', value: 'UCFML-' },
  { name: 'Survey Artillery', value: 'UCFS--' },
  { name: 'Air Assault Survey Artillery', value: 'UCFSS-' },
  { name: 'Airborne Survey Artillery', value: 'UCFSA-' },
  { name: 'Light Survey Artillery', value: 'UCFSL-' },
  { name: 'Mountain Survey Artillery', value: 'UCFSO-' },
  { name: 'Meteorological Artillery', value: 'UCFO--' },
  { name: 'Air Assault Meteorological Artillery', value: 'UCFOS-' },
  { name: 'Airborne Meteorological Artillery', value: 'UCFOA-' },
  { name: 'Light Meteorological Artillery', value: 'UCFOL-' },
  { name: 'Mountain Meteorological Artillery', value: 'UCFOO-' },
  // RECON
  { name: 'Reconnaissance', value: 'UCR---' },
  { name: 'Horse Reconnaissance', value: 'UCRH--' },
  { name: 'Cavalry Reconnaissance', value: 'UCRV--' },
  { name: 'Armored Cavalry Reconnaissance', value: 'UCRVA-' },
  { name: 'Motorized Cavalry Reconnaissance', value: 'UCRVM-' },
  { name: 'Air Cavalry Reconnaissance', value: 'UCRVO-' },
  { name: 'Arctic Reconnaissance', value: 'UCRC--' },
  { name: 'Air Assault Reconnaissance', value: 'UCRS--' },
  { name: 'Airborne Reconnaissance', value: 'UCRA--' },
  { name: 'Mountain Reconnaissance', value: 'UCRO--' },
  { name: 'Light Reconnaissance', value: 'UCRL--' },
  { name: 'Marine Reconnaissance', value: 'UCRR--' },
  { name: 'Marine Division Reconnaissance', value: 'UCRRD-' },
  { name: 'Marine Force Reconnaissance', value: 'UCRRF-' },
  { name: 'Marine Light Armored Reconnaissance (LAR) Reconnaissance', value: 'UCRRL-' },
  { name: 'Long Range Surveillance (LRS) Reconnaissance', value: 'UCRX--' },
  // MISSILE
  { name: 'Missile (S-S)', value: 'UCM---' },
  { name: 'Tactical Missile (S-S)', value: 'UCMT--' },
  { name: 'Strategic Missile (S-S)', value: 'UCMS--' },
  // SECURITY FORCES
  { name: 'Internal Security Forces', value: 'UCS---' },
  { name: 'Riverine Security Forces', value: 'UCSW--' },
  { name: 'Dismounted Security Forces', value: 'UCSGD-' },
  { name: 'Motorized Security Forces', value: 'UCSGM-' },
  { name: 'Mechanized Security Forces', value: 'UCSGA-' },
  { name: 'Mechanized Wheeled Security Forces', value: 'UCSM--' },
  { name: 'Railroad Security Forces', value: 'UCSR--' },
  { name: 'Aviation Security Forces', value: 'UCSA--' },
  // COMBAT SUPPORT
  // CBRN
  { name: 'Combat Support', value: 'UU----' },
  { name: 'CBRN', value: 'UUA---' },
  { name: 'Chemical', value: 'UUAC--' },
  { name: 'Smoke/Decon', value: 'UUACC-' },
  { name: 'Mechanized Smoke/Decon', value: 'UUACCK' },
  { name: 'Motorized Smoke/Decon', value: 'UUACCM' },
  { name: 'Smoke', value: 'UUACS-' },
  { name: 'Motorized Smoke', value: 'UUACSM' },
  { name: 'Armor Smoke', value: 'UUACSA' },
  { name: 'Recon Chemical', value: 'UUACR-' },
  { name: 'Wheeled Armored Chemical Vehicle', value: 'UUACRW' },
  { name: 'Wheeled Armored Reconnaissance Chemical Vehicle', value: 'UUACRS' },
  { name: 'Nuclear', value: 'UUAN--' },
  { name: 'Biological', value: 'UUAB--' },
  { name: 'Recon Equipped Biological', value: 'UUABR-' },
  { name: 'Decontamination', value: 'UUAD--' },
  // MILITARY INTELLIGENCE
  { name: 'Military Intelligence', value: 'UUM---' },
  { name: 'Aerial Exploitation', value: 'UUMA--' },
  { name: 'Signal Intelligence (SIGINT)', value: 'UUMS--' },
  { name: 'Electronic Warfare', value: 'UUMSE-' },
  { name: 'Armored Wheeled Electronic Warfare Vehicle', value: 'UUMSEA' },
  { name: 'Direction Finding Electronic Warfare', value: 'UUMSED' },
  { name: 'Electronic Warfare, Intercept', value: 'UUMSEI' },
  { name: 'Electronic Warfare, Jamming', value: 'UUMSEJ' },
  { name: 'Electronic Warfare, Theater', value: 'UUMSET' },
  { name: 'Electronic Warfare, Corps', value: 'UUMSEC' },
  { name: 'Counterintelligence', value: 'UUMC--' },
  { name: 'Ground Surveillance RADAR', value: 'UUMRG-' },
  { name: 'Sensor Surveillance', value: 'UUMRS-' },
  { name: 'Sensor SCM', value: 'UUMRSS' },
  { name: 'Ground Station Module', value: 'UUMRX-' },
  { name: 'Military Intelligence, Meteorological', value: 'UUMMO-' },
  { name: 'Military Intelligence, Operations', value: 'UUMO--' },
  { name: 'Military Intelligence, Tactical Exploit', value: 'UUMT--' },
  { name: 'Military Intelligence, Interrogation', value: 'UUMQ--' },
  { name: 'Military Intelligence, Joint Intelligence Center', value: 'UUMJ--' },
  // LAW ENFORCEMENT
  { name: 'Law Enforcement Unit', value: 'UUL---' },
  { name: 'Shore Patrol', value: 'UULS--' },
  { name: 'Military Police', value: 'UULM--' },
  { name: 'Civilian Law Enforcement', value: 'UULC--' },
  { name: 'Security Police (Air)', value: 'UULF--' },
  { name: 'Central Intelligence Division (CID)', value: 'UULD--' },
  // SIGNALS
  { name: 'Signal Unit', value: 'UUS---' },
  { name: 'Area Signal Unit', value: 'UUSA--' },
  { name: 'Signals Communication Configured Package', value: 'UUSC--' },
  { name: 'Signals Large Communication Configured Package (LCCP)', value: 'UUSCL-' },
  { name: 'Signals Command Operations', value: 'UUSO--' },
  { name: 'Signals Forward Communications', value: 'UUSF--' },
  { name: 'Signals Multiple Subscriber Element', value: 'UUSM--' },
  { name: 'Signals Small Extension Node', value: 'UUSMS-' },
  { name: 'Signals Large Extension Node', value: 'UUSML-' },
  { name: 'Signals Node Center', value: 'UUSMN-' },
  { name: 'Signals Radio Unit', value: 'UUSR--' },
  { name: 'Signals Tactical Satellite', value: 'UUSRS-' },
  { name: 'Signals Teletype Center', value: 'UUSRT-' },
  { name: 'Signals Relay', value: 'UUSRW-' },
  { name: 'Signals Support', value: 'UUSS--' },
  { name: 'Singals Telephone Switch', value: 'UUSW--' },
  { name: 'Singals Electronic Ranging', value: 'UUSX--' },
  { name: 'Information Warfare Unit', value: 'UUI---' },
  { name: 'Landing Support', value: 'UUP---' },
  { name: 'Explosive Ordnance Disposal', value: 'UUE---' },
  { name: 'Combat Service Support', value: 'US----' },
  { name: 'Administrative (Admin)', value: 'USA---' },
  { name: 'Admin Theater', value: 'USAT--' },
  { name: 'Admin Corps', value: 'USAC--' },
  { name: 'Judge Advocate General (JAG)', value: 'USAJ--' },
  { name: 'JAG Theater', value: 'USAJT-' },
  { name: 'JAG Corps', value: 'USAJC-' },
  { name: 'Postal', value: 'USAO--' },
  { name: 'Postal Theater', value: 'USAOT-' },
  { name: 'Postal Corps', value: 'USAOC-' },
  { name: 'Finance', value: 'USAF--' },
  { name: 'Finance Theater', value: 'USAFT-' },
  { name: 'Finance Corps', value: 'USAFC-' },
  { name: 'Personnel Services', value: 'USAS--' },
  { name: 'Personnel Theater', value: 'USAST-' },
  { name: 'Personnel Corps', value: 'USASC-' },
  { name: 'Mortuary/Graves Registry', value: 'USAM--' },
  { name: 'Mortuary/Graves Registry Theater', value: 'USAMT-' },
  { name: 'Mortuary/Graves Registry Corps', value: 'USAMC-' },
  { name: 'Religious/Chaplain', value: 'USAR--' },
  { name: 'Religious/Chaplain Theater', value: 'USART-' },
  { name: 'Religious/Chaplain Corps', value: 'USARC-' },
  { name: 'Public Affairs', value: 'USAP--' },
  { name: 'Public Affairs Theater', value: 'USAPT-' },
  { name: 'Public Affairs Corps', value: 'USAPC-' },
  { name: 'Public Affairs Broadcast', value: 'USAPB-' },
  { name: 'Public Affairs Broadcast Theater', value: 'USAPBT' },
  { name: 'Public Affairs Broadcast Corps', value: 'USAPBC' },
  { name: 'Public Affairs Joint Information Bureau (JIB)', value: 'USAPM-' },
  { name: 'Public Affairs JIB Theater', value: 'USAPMT' },
  { name: 'Public Affairs JIB Corps', value: 'USAPMC' },
  { name: 'Replacement Holding Unit (RHU)', value: 'USAX--' },
  { name: 'RHU Theater', value: 'USAXT-' },
  { name: 'RHU Corps', value: 'USAXC-' },
  { name: 'Labor', value: 'USAL--' },
  { name: 'Labor Theater', value: 'USALT-'},
  { name: 'Labor Corps', value: 'USALC-'},
  { name: 'Morale, Welfare, Recreation (MWR)', value: 'USAW--'},
  { name: 'MWR Theater', value: 'USAWT-'},
  { name: 'MWR Corps', value: 'USAWC-'},
  { name: 'Quartermaster (Supply)', value: 'USAQ--'},
  { name: 'Quartermaster (Supply) Theater', value: 'USAQT-'},
  { name: 'Quartermaster (Supply) Corps', value: 'USAQC-'},
  { name: 'Medical', value: 'USM---'},
  { name: 'Medical Theater', value: 'USMT--'},
  { name: 'Medical Corps', value: 'USMC--'},
  { name: 'Medical Treatment Facility', value: 'USMM--'},
  { name: 'Medical Treatment Facility Theater', value: 'USMMT-'},
  { name: 'Medical Treatment Facility Corps', value: 'USMMC-'},
  { name: 'Medical Veterinary', value: 'USMV--'},
  { name: 'Medical Veterinary Theater', value: 'USMVT-'},
  { name: 'Medical Veterinary Corps', value: 'USMVC-'},
  { name: 'Medical Dental', value: 'USMD--'},
  { name: 'Medical Dental Theater', value: 'USMDT-'},
  { name: 'Medical Dental Corps', value: 'USMDC-'},
  { name: 'Medical Psychological', value: 'USMP--'},
  { name: 'Medical Psychological Theater', value: 'USMPT-'},
  { name: 'Medical Psychological Corps', value: 'USMPC-'},
  { name: 'Supply', value: 'USS---'},
  { name: 'Supply Theater', value: 'USST--'},
  { name: 'Supply Corps', value: 'USSC--'},
  { name: 'Supply Class I', value: 'USS1--'},
  { name: 'Supply Class I Theater', value: 'USS1T-'},
  { name: 'Supply Class I Corps', value: 'USS1C-'},
  { name: 'Supply Class II', value: 'USS2--'},
  { name: 'Supply Class II Theater', value: 'USS2T-'},
  { name: 'Supply Class II Corps', value: 'USS2C-'},
  { name: 'Supply Class III', value: 'USS3--'},
  { name: 'Supply Class III Theater', value: 'USS3T-'},
  { name: 'Supply Class III Corps', value: 'USS3C-'},
  { name: 'Supply Class III Aviation', value: 'USS3A-'},
  { name: 'Supply Class III Aviation Theater', value: 'USS3AT'},
  { name: 'Supply Class III Aviation Corps', value: 'USS3AC'},
  { name: 'Supply Class IV', value: 'USS4--'},
  { name: 'Supply Class IV Theater', value: 'USS4T-'},
  { name: 'Supply Class IV Corps', value: 'USS4C-'},
  { name: 'Supply Class V', value: 'USS5--'},
  { name: 'Supply Class V Theater', value: 'USS5T-'},
  { name: 'Supply Class V Corps', value: 'USS5C-'},
  { name: 'Supply Class VI', value: 'USS6--'},
  { name: 'Supply Class VI Theater', value: 'USS6T-'},
  { name: 'Supply Class VI Corps', value: 'USS6C-'},
  { name: 'Supply Class VII', value: 'USS7--'},
  { name: 'Supply Class VII Theater', value: 'USS7T-'},
  { name: 'Supply Class VII Corps', value: 'USS7C-'},
  { name: 'Supply Class VIII', value: 'USS8--'},
  { name: 'Supply Class VIII Theater', value: 'USS8T-'},
  { name: 'Supply Class VIII Corps', value: 'USS8C-'},
  { name: 'Supply Class IX', value: 'USS9--'},
  { name: 'Supply Class IX Theater', value: 'USS9T-'},
  { name: 'Supply Class IX Corps', value: 'USS9C-'},
  { name: 'Supply Class X', value: 'USSX--'},
  { name: 'Supply Class X Theater', value: 'USSXT-'},
  { name: 'Supply Class X Corps', value: 'USSXC-'},
  { name: 'Supply Laundry/Bath', value: 'USSL--'},
  { name: 'Supply Laundry/Bath Theater', value: 'USSLT-'},
  { name: 'Supply Laundry/Bath Corps', value: 'USSLC-'},
  { name: 'Supply Water', value: 'USSW--'},
  { name: 'Supply Water Theater', value: 'USSWT-'},
  { name: 'Supply Water Corps', value: 'USSWC-'},
  { name: 'Supply Water Purification', value: 'USSWP-'},
  { name: 'Supply Water Purification Theater', value: 'USSWPT'},
  { name: 'Supply Water Purification Corps', value: 'USSWPC'},
  { name: 'Transportation', value: 'UST---'},
  { name: 'Transportation Theater', value: 'USTT--'},
  { name: 'Transportation Corps', value: 'USTC--'},
  { name: 'Transportation Movement Control Center (MCC)', value: 'USTM--'},
  { name: 'MCC Theater', value: 'USTMT-'},
  { name: 'MCC Corps', value: 'USTMC-'},
  { name: 'Railhead', value: 'USTR--'},
  { name: 'Railhead Theater', value: 'USTRT-'},
  { name: 'Railhead Corps', value: 'USTRC-'},
  { name: 'SPOD/SPOE', value: 'USTS--'},
  { name: 'SPOD/SPOE Theater', value: 'USTST-'},
  { name: 'SPOD/SPOE Corps', value: 'USTSC-'},
  { name: 'APOD/APOE', value: 'USTA--'},
  { name: 'APOD/APOE Theater', value: 'USTAT-'},
  { name: 'APOD/APOE Corps', value: 'USTAC-'},
  { name: 'Missile Transportation', value: 'USTI--'},
  { name: 'Missile Transportation Theater', value: 'USTIT-'},
  { name: 'Missile Transportation Corps', value: 'USTIC-'},
  { name: 'Maintenance', value: 'USX---'},
  { name: 'Maintenance Theater', value: 'USXT--'},
  { name: 'Maintenance Corps', value: 'USXC--'},
  { name: 'Maintenance Heavy', value: 'USXH--'},
  { name: 'Maintenance Heavy Theater', value: 'USXHT-'},
  { name: 'Maintenance Heavy Corps', value: 'USXHC-'},
  { name: 'Maintenance Recovery', value: 'USXR--'},
  { name: 'Maintenance Recovery Theater', value: 'USXRT-'},
  { name: 'Maintenance Recovery Corps', value: 'USXRC-'},
  { name: 'Ordnance Maintenance', value: 'USXO--'},
  { name: 'Ordnance Maintenance Theater', value: 'USXOT-'},
  { name: 'Ordnance Maintenance Corps', value: 'USXOC-'},
  { name: 'Missile Maintenance', value: 'USXOM-'},
  { name: 'Missile Maintenance Theater', value: 'USXOMT'},
  { name: 'Missile Maintenance Corps', value: 'USXOMC'},
  { name: 'Electro-Optical Maintenance', value: 'USXE--'},
  { name: 'Electro-Optical Maintenance Theater', value: 'USXET-'},
  { name: 'Electro-Optical Maintenance Corps', value: 'USXEC-'},
  { name: 'Special C2 Headquarters Component', value: 'UH----'},

]

export { echelonSizes, sidcCodes }