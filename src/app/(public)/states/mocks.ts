import { MenuItem } from "./types";

export const data = [
{ period_month: "2023-02", facility_count: 3, attp_valid_count: 3, attp_cert_issued_count: 3, processing_time_p50: 11, processing_time_p90: 11, certified_facility_rate: 1 },
{ period_month: "2023-03", facility_count: 8, attp_valid_count: 8, attp_cert_issued_count: 8, processing_time_p50: 10, processing_time_p90: 11, certified_facility_rate: 1 },
{ period_month: "2023-04", facility_count: 2, attp_valid_count: 2, attp_cert_issued_count: 2, processing_time_p50: 10.5, processing_time_p90: 11.7, certified_facility_rate: 1 },
{ period_month: "2023-06", facility_count: 4, attp_valid_count: 4, attp_cert_issued_count: 3, processing_time_p50: 10, processing_time_p90: 11, certified_facility_rate: 1 },
{ period_month: "2023-07", facility_count: 1, attp_valid_count: 1, attp_cert_issued_count: 1, processing_time_p50: 9, processing_time_p90: 9, certified_facility_rate: 1 },
{ period_month: "2023-09", facility_count: 2, attp_valid_count: 2, attp_cert_issued_count: 1, processing_time_p50: 12, processing_time_p90: 12, certified_facility_rate: 1 },
{ period_month: "2023-10", facility_count: 1, attp_valid_count: 1, attp_cert_issued_count: 1, processing_time_p50: 11, processing_time_p90: 11, certified_facility_rate: 1 },
{ period_month: "2023-11", facility_count: 1, attp_valid_count: 1, attp_cert_issued_count: 1, processing_time_p50: 9, processing_time_p90: 9, certified_facility_rate: 1 },
{ period_month: "2023-12", facility_count: 4, attp_valid_count: 4, attp_cert_issued_count: 4, processing_time_p50: 10.5, processing_time_p90: 11, certified_facility_rate: 1 },
];

export const mockMenuItems: MenuItem[] = [
    {
      id: 1,
      name: "Home",
      slug: "/",
    },
    {
      id: 2,
      name: "About",
      slug: "/about",
      children: [
        {
          id: 21,
          name: "Our Platform",
          slug: "/about/platform",
        },
        {
          id: 22,
          name: "FAQ",
          slug: "/about/faq",
        },
      ],
    },
    {
      id: 3,
      name: "Pricing",
      slug: "/pricing",
      children: [
        {
          id: 31,
          name: "Code Signing",
          slug: "/pricing/code-signing",
        },
        {
          id: 32,
          name: "Certificate Plan",
          slug: "/pricing/certificate-plans",
        },
        {
          id: 33,
          name: "Mobile App Publish",
          slug: "/pricing/mobile-app-publish",
        },
        {
          id: 34,
          name: "Free Code Signing",
          slug: "/pricing/free-code-signing",
        },
      ],
    },
    {
      id: 4,
      name: "App",
      slug: "/apps",
    },
    {
      id: 5,
      name: "Contact",
      slug: "/contact",
    },
    {
      id: 6,
      name: "Blog",
      slug: "/blog",
    },
];