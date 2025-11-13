export interface Province {
  name: string;
  name_km: string;
}

export interface Subject {
  name: string;
  name_km: string;
  duration: number; // Duration in minutes
  duration_km: string;
  score: number;
  score_km: string;
}

export interface Result {
  id: number;
  student_name: string;
  gender: string;
  school: string;
  district: string;
  province: string;
  phone: string;
  subject: string;
  score: number;
  grade: number;
  date: string;
}


// Sample subjects
export const subjects: Subject[] = [
  { name: 'Mathematics', name_km: 'គណិតវិទ្យា', duration: 60, duration_km: '១ម៉ោង', score: 100, score_km: '១០០ពិន្ទុ' },
  { name: 'Khmer Language', name_km: 'ភាសាខ្មែរ', duration: 60, duration_km: '១ម៉ោង', score: 100, score_km: '១០០ពិន្ទុ' },
  { name: 'Physics', name_km: 'រូបវិទ្យា', duration: 60, duration_km: '១ម៉ោង', score: 50, score_km: '៥០ពិន្ទុ' },
  { name: 'Chemistry', name_km: 'គីមីវិទ្យា', duration: 60, duration_km: '១ម៉ោង', score: 50, score_km: '៥០ពិន្ទុ' },
  { name: 'English', name_km: 'ភាសាអង់គ្លេស', duration: 60, duration_km: '១ម៉ោង', score: 100, score_km: '១០០ពិន្ទុ' },
];


// Sample provinces
export const provinces: Province[] = [
  { name: 'Banteay Meanchey', name_km: 'បន្ទាយមានជ័យ' },
  { name: 'Battambang', name_km: 'បាត់ដំបង' },
  { name: 'Kampong Cham', name_km: 'កំពង់ចាម' },
  { name: 'Kampong Chhnang', name_km: 'កំពង់ឆ្នាំង' },
  { name: 'Kampong Speu', name_km: 'កំពង់ស្ពឺ' },
  { name: 'Kampong Thom', name_km: 'កំពង់ធំ' },
  { name: 'Kampot', name_km: 'កំពត' },
  { name: 'Kandal', name_km: 'កណ្តាល' },
  { name: 'Kep', name_km: 'កែប' },
  { name: 'Koh Kong', name_km: 'កោះកុង' },
  { name: 'Kratie', name_km: 'ក្រចេះ' },
  { name: 'Mondulkiri', name_km: 'មណ្ឌលគិរី' },
  { name: 'Oddar Meanchey', name_km: 'ឧត្តរមានជ័យ' },
  { name: 'Pailin', name_km: 'ប៉ៃលិន' },
  { name: 'Phnom Penh', name_km: 'ភ្នំពេញ' },
  { name: 'Preah Sihanouk', name_km: 'ព្រះសីហនុ' },
  { name: 'Preah Vihear', name_km: 'ព្រះវិហារ' },
  { name: 'Prey Veng', name_km: 'ព្រៃវែង' },
  { name: 'Pursat', name_km: 'ពោធិ៍សាត់' },
  { name: 'Ratanakiri', name_km: 'រតនគិរី' },
  { name: 'Siem Reap', name_km: 'សៀមរាប' },
  { name: 'Stung Treng', name_km: 'ស្ទឹងត្រែង' },
  { name: 'Svay Rieng', name_km: 'ស្វាយរៀង' },
  { name: 'Takeo', name_km: 'តាកែវ' },
  { name: 'Tboung Khmum', name_km: 'ត្បូងឃ្មុំ' },
];


export const googleFormLinks: Record<string, string> = {
 'Banteay Meanchey-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdX1t8y-qRz7P23fxwyHpVpmstCeYvzd_z8vxB4H4vJV9-2_g/viewform?usp=dialog',
 'Banteay Meanchey-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSey2xV61iDZJ0_6RsnhCAcySnP616URBjf6OjGte_eIKj7QIw/viewform?usp=dialog',
 'Banteay Meanchey-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSen57DyOTERwL_bAUgfSKcOmo8ohofdx9loL1rAHzoEunZvYw/viewform?usp=dialog',
 'Battambang-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSfRX4VZX5p-XBYQlBo3W8l4P18dANCpVm0Cxn9CdgkT12IUZw/viewform?usp=dialog',
 'Battambang-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSf-7MpjPC9Jyq3itpuOtRp9yq-x8Dk5x9s3KD4LajFwyJ19VA/viewform?usp=dialog',
 'Battambang-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSfABJrHl74fNm_heCutYhITnpx9K9wxc5xfoaaSsmMFEn_Kgg/viewform?usp=dialog',
 'Kampong Cham-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSd3ftFlyFneGQineI4W9gHAoWrSbyUp28ilZe9haO34EAUzuQ/viewform?usp=dialog',
 'Kampong Cham-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdcpotMs3kEl2rYNhGlJTM5uGeYIEAhioVg3-socPDh7KCoXw/viewform?usp=dialog',
 'Kampong Cham-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdvtYToE3-OVoAwlXdWFVwOU2NEeg4FtZ8PZMbsUwold1pIow/viewform?usp=dialog',
 'Kampong Chhnang-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdyz5Of8FDO6cP0gryHn2LwVvtQ3O4q871VCxwrQfSM6Y7lSg/viewform?usp=dialog',
 'Kampong Chhnang-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdMBDO2Oa2AQ5ehV8shmloHEdG0euHlF1PPValgisWMVHc2tA/viewform?usp=dialog',
 'Kampong Chhnang-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdY9TDKMXcnus-yym1RqtzL_pSbdk28kV9RG3iAx3E1Ty3oAw/viewform?usp=dialog',
 'Kampong Speu-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSeaPyf_R6qkvxY7vwKoyDnF69d4k_rbNCywAV6UBmUQo1fELQ/viewform?usp=dialog',
 'Kampong Speu-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSenMklRKRPovmaagFj5AMbxuWgpvtPG1J2JSoWgfcHT3-fKQQ/viewform?usp=dialog',
 'Kampong Speu-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScPj6JvUe-2OmMLYEALੋDMhiHMh4HR3xaIU5kYwfIUl_eADQ/viewform?usp=dialog',
 'Kampong Thom-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdEBpB_amcp9Zww9ZKWAP0CoAI4bfa7-Iy1ajGJJthW7x6_hQ/viewform?usp=dialog',
 'Kampong Thom-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSf1rQdQVGa9Fn2_kspa70jaIDUmDN9iN1Gq4clEO1pMnaOyUw/viewform?usp=dialog',
 'Kampong Thom-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSd8tOd_cieoHxpHcbVb4i9q2ITPJyGmVznV7rSSboyJrStuBg/viewform?usp=dialog',
 'Kampot-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdilSoeTKSlLWq4nv-u70-C2fIEDUns1rxH1rWHDExgDGXk9w/viewform?usp=dialog',
 'Kampot-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeKB6LhvDnCksM7Q_k4TevSAAmk8FDJdSQWLX9fV2yFmfPk3A/viewform?usp=dialog',
 'Kampot-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScqR9yT1flaQXS66RnHqyXTeK24DJ0HTSMMscWrhv4WDnLRSA/viewform?usp=dialog',
 'Kandal-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSfIS8eQ2WOVd2gpZUdjV9hvXCG3KolipOiy6vn2jY5dl-m7kA/viewform?usp=dialog',
 'Kandal-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeq-H--V2CzTRqfmGmyk32bQ02dJKmyvGCqrmgysw6FxnKkNw/viewform?usp=dialog',
 'Kandal-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSd4roPc648QjoGlmy7Hnk9piQatMyxJPKKaqO1JX6MR_7O6Pg/viewform?usp=dialog',
 'Kep-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLScWoF0_1TahrsBY9CmmPZYuKyLK2BbbxIFwt74v1k9h7GcJKA/viewform?usp=dialog',
 'Kep-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeCMWsehIGYBuid9wqUBjMLtKQ2oEXXaBXT_YGQ3PG3iXz-Ug/viewform?usp=dialog',
 'Kep-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScMRg8FhHoNoqSgHmiVpZoeKFjqWT0hCve_kQ07iWXsJ4Ogtg/viewform?usp=dialog',
 'Koh Kong-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdb3FTSJspdyxEkzBonmoqYLWEMAbC_fPWyQtWgIuK-kZGzFg/viewform?usp=dialog',
 'Koh Kong-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSfjKGS_nX7u0cTCRxxyrx_Im84CdYKq_8LX__reKD1yxoyQXw/viewform?usp=dialog',
 'Koh Kong-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdN49JRDOFLy7tAKrtTwSgAnP9en_nX8LmagCHRlYz32rOOlA/viewform?usp=dialog',
 'Kratie-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdpDpT8H0z_eHTSc8atv_e0V7HLCo1gslFGkjbEGY3O2xlOIw/viewform?usp=dialog',
 'Kratie-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeJ8JxDOTjxhnl1tsoeUAN5UfAEcRHNsymmP68WfXbDQH4mOg/viewform?usp=dialog',
 'Kratie-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSeJYCVE1HqocPehIwTdcNDSkmywsTjRoyB-vGF1xeu_uopqsw/viewform?usp=dialog',
 'Mondulkiri-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSeJYxBdJ6DDNGx848q1XqudLzvzqf4FytcxiDF8jZUTI2RiiQ/viewform?usp=dialog',
 'Mondulkiri-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeCXN7gD8JQsrGVGAHLEHR_tl4YviEOrDKxpYnWPRWxTrSprw/viewform?usp=dialog',
 'Mondulkiri-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScTWaTHguS8dNhj-cIhGsIb4l4ji2YrI-GFFCePOsLEJDJygw/viewform?usp=dialog',
 'Oddar Meanchey-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLScS7Fim1OeRDpjKTqP_jtg84WtOSXUrnb-RXIEpcbSqKgajZQ/viewform?usp=dialog',
 'Oddar Meanchey-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSfcsMemGjyxR-rS0mRR_povmU5dDQjqPIVTujZyzmI_QO0cfA/viewform?usp=dialog',
 'Oddar Meanchey-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScp0mDFaOtARldvl4AjdbJP1cXYo26YUU_x5-s12lvS7qPnXA/viewform?usp=dialog',
 'Pailin-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSefPGnF-2O1x8KgKkXA6KW-4W7u8T-o4yvohoPTeje15017XQ/viewform?usp=dialog',
 'Pailin-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSfLPVlJqxVxvJezmNVAYT53sn6fTrenzq6LJMJCzH7fVe053w/viewform?usp=dialog',
 'Pailin-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdDuh_leftxxISswkPqYg3GrFxTWLlaTx0XQO-4DJ9bj7DE1w/viewform?usp=dialog',
 'Phnom Penh-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSezBUlw3zTnFYHRUWnBHEiCIcpOne2agNYdH54lG7BFftRfxw/viewform?usp=dialog',
 'Phnom Penh-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdumfyTtIpl2mHVHUCLmwOkVIvqJb4q4T5SdYlpqLRRb8pEbA/viewform?usp=dialog',
 'Phnom Penh-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSed5E7tJdh_ZIVC1dkGIQz_TrzVyuKttblbBHmL7CQZpyiPuA/viewform?usp=dialog',
 'Preah Sihanouk-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSfMaYqQUnaiegKV2xZnXh0KADwlj6wwxpRp2H8qg8_Iihae7A/viewform?usp=dialog',
 'Preah Sihanouk-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeNINzPsqenDoP8gnP0cxtuU-ymhQNc5FgUpqJCCcNPACQgTw/viewform?usp=dialog',
 'Preah Sihanouk-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSd0Gbyzq_TMp6BkI3TsagYyWH0fDzYoWukh7mpUgwRDggDVuw/viewform?usp=dialog',
 'Preah Vihear-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdX-8DshZ4DZirtcBoB1r2iYt0tZPprT-ImYYZDYzoFMKu_8g/viewform?usp=dialog',
 'Preah Vihear-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdo4epFJGdPJU0LJJCM0WNrI8ogc73ttGV47LacDXKilFvLCQ/viewform?usp=dialog',
 'Preah Vihear-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSfsY2wlWdAQnKLv5yFg_el_V0eDKfYvKWMhi4hI7T7poLdzlQ/viewform?usp=dialog',
 'Prey Veng-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSepjNG11cTnyfJnuxa1jHlW6fHW_wVeWHvth9Wr5215qPCqmw/viewform?usp=dialog',
 'Prey Veng-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdEiPhwYBZISRs3GrgUCHYVeydJpFM51kmhgihe-03_u7_I7w/viewform?usp=dialog',
 'Prey Veng-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSeDCntdOeHtEJQ920aS8neeu3yIdPS5kt9k3B1ubpxtgqjw4A/viewform?usp=dialog',
 'Pursat-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSdDwqua3rNnw02KDpUHxpMW8rFjeMEWZRWbnxTfchXSPteUcw/viewform?usp=dialog',
 'Pursat-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeE2634w7b5slUuKowGrm-hhOA7x_2xhe8kHzmTETHF4Cm6Rg/viewform?usp=dialog',
 'Pursat-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSeZ4UaTIgrMnAHTQPyRffNwXEP_K1J9srONU2oIKK3zPyjn6Q/viewform?usp=dialog',
 'Ratanakiri-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSe2l81sI8TbXBnsd3j_QkEfsHnoIyfGVGZzVQKNAvLu9OOzDw/viewform?usp=dialog',
 'Ratanakiri-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLScBPBnHomMvQji0oh9ePV7ZhbQPqq2aOK5HGM5dRXNiT91-Sw/viewform?usp=dialog',
 'Ratanakiri-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSfFhQGuvqGJPd6M5JVsWXxZfJn5cu8JJ7nmfsohgaPGl8sfjw/viewform?usp=dialog',
 'Siem Reap-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLScFr6WshEy6jEUt_LLCrZI3TjV1Q_ZiBq4nTfR-DlR-J0PI1w/viewform?usp=dialog',
 'Siem Reap-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSd8TAR1Dv_NO8DIdd5vcGdp6t5nxL4P-5QiE9h_sMiQKOlMYQ/viewform?usp=dialog',
 'Siem Reap-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLScGueDIM1k5vaVmJJCQfw5xIeBb09PDzAEIovfjFSZLCex4Bw/viewform?usp=dialog',
 'Stung Treng-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSflt1RnBU07MXrjipdSuG6Jc8wb76XGvSAdsPR0OQH2gXun0g/viewform?usp=dialog',
 'Stung Treng-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSdcDeMo1-rYSbRNkhd3rJnl5MjtLnvR7AEHYjBeh0YdO_rBHw/viewform?usp=dialog',
 'Stung Treng-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdXyrnwEuBzIvySr0i5HLJ-eX0dFXfJGHR00kO29A2XPBTS_A/viewform?usp=dialog',
 'Svay Rieng-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLSe-iPevsXW1MzkHMEvnokEE6EQNUfdZl8fE7AxgceavJjMB9A/viewform?usp=dialog',
 'Svay Rieng-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSfZ2EiyPeJtiB41UhuUDjwy9Uzm6vui02INY6t1XnOjDv07NA/viewform?usp=dialog',
 'Svay Rieng-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdgEVxbB3rB_trB4q_8TnCepbA9MWbpoltu9SUyKPWxri4qRA/viewform?usp=dialog',
 'Takeo-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLScUuwKFlcH-p43vDQH6sjPyZfuVnqSNNEbuh9BNVByrTXaFNA/viewform?usp=dialog',
 'Takeo-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLSeeGdn8NzZwgXxvAr0JjYfr-8nqCCg8pnPAbjxXFs0iOaKB1w/viewform?usp=dialog',
 'Takeo-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSdVlbAkCXQGUiNW7v-XEiAkwv9fDRUVuXzzUz-JY2QXpJBSrA/viewform?usp=dialog',
 'Tboung Khmum-Mathematics': 'https://docs.google.com/forms/d/e/1FAIpQLScbnRPbovLLsVnFYAkO9ZTCcLw4P_J4-Qvvl_6UTYR-cVIN8g/viewform?usp=dialog',
 'Tboung Khmum-Physics': 'https://docs.google.com/forms/d/e/1FAIpQLScicwy2JhrhwoEu707t_cRhxINZYQOsYJLdNr5vCuVwygiJ1Q/viewform?usp=dialog',
 'Tboung Khmum-Khmer Language': 'https://docs.google.com/forms/d/e/1FAIpQLSeQwhjKBaCHXRg1n6Tn9VvFvuQApEohkhc6ZPCLb2i9QWXaaQ/viewform?usp=dialog',
};
