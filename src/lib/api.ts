const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9080';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    cache: 'no-store',
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ─── Carrier Types ───

export interface CarrierFleet {
  trucks?: number;
  tractors?: number;
  trailers?: number;
  drivers?: number;
}

export interface CarrierFMCSA {
  authority_status?: string;
  authority_active_since?: string;
  usdot?: string;
  docket?: string;
  carrier_operation?: string;
  mcs150_mileage?: number;
  mcs150_year?: string;
}

export interface CarrierSafetyRecord {
  vehicle_maintenance_percentile?: number;
  unsafe_driving_percentile?: number;
  hos_compliance_percentile?: number;
  driver_fitness_percentile?: number;
  total_crashes?: number;
  fatal_crashes?: number;
  injury_crashes?: number;
  driver_inspections?: number;
  driver_oos_rate?: number;
  vehicle_inspections?: number;
  vehicle_oos_rate?: number;
}

export interface CarrierAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Carrier {
  _id: string;
  name: string;
  dot: string;
  mc_number?: string;
  logo?: string;
  description?: string;
  phone?: string;
  website?: string;
  address?: CarrierAddress;
  operating_states?: string[];
  headquarters_states?: string[];
  fleet?: CarrierFleet;
  truck_brands?: string[];
  late_model_trucks?: boolean;
  operation_classifications?: string[];
  cargo_carried?: string[];
  fmcsa?: CarrierFMCSA;
  safety?: CarrierSafetyRecord;
  responsive_employer?: boolean;
  createdAt?: string;
}

// ─── Job Types ───

export interface JobSalary {
  from: number;
  to: number;
}

export interface JobHomeTime {
  summary?: string;
  days_out_min?: number;
  days_out_max?: number;
  details?: string[];
}

export interface JobMiles {
  min?: number;
  max?: number;
}

export interface JobEquipment {
  truck_brands?: string[];
  governed_speed?: number;
  transmission?: string;
  late_model?: boolean;
  apu_equipped?: boolean;
}

export interface JobOrientation {
  accommodation_covered?: boolean;
  travel_covered?: boolean;
  details?: string;
}

export interface JobLocation {
  city?: string;
  state?: string;
}

export interface ApiJob {
  _id: string;
  carrier: Carrier;
  status: string;
  title: string;
  description?: string;
  city?: string;
  state?: string;
  locations?: JobLocation[];
  route_type?: string;
  employment_type?: string;
  job_type?: string; // legacy
  cdl_class?: string;
  experience_required?: string;
  driver_type?: string;
  sap_policy?: string;
  haul_type?: string;
  load_type?: string;
  freight_handling?: string;
  salary: JobSalary;
  pay_details?: string[];
  sign_on_bonus?: number;
  pay_frequency?: string;
  home_time?: JobHomeTime;
  miles_per_week?: JobMiles;
  hiring_requirements?: string[];
  benefits: string[];
  pet_policy?: string;
  rider_policy?: string;
  equipment?: JobEquipment;
  additional_info?: string[];
  orientation?: JobOrientation;
  endorsements_required?: string[];
  createdAt?: string;
}

// ─── Common Types ───

export interface FilterMeta {
  pagination: {
    page: number;
    limit: number;
    totalResults: number;
    totalPages: number;
  };
}

export interface FilterResponse<T> {
  data: T[];
  meta: FilterMeta;
}

// ─── Public API Functions ───

export async function getJobs(params?: {
  filter?: string;
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<FilterResponse<ApiJob>> {
  return apiFetch<FilterResponse<ApiJob>>('/api/public/jobs', {
    params: params as Record<string, string | number | undefined>,
  });
}

export async function getJob(id: string): Promise<ApiJob> {
  return apiFetch<ApiJob>(`/api/public/jobs/${id}`);
}

export async function getCarriers(params?: {
  filter?: string;
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<FilterResponse<Carrier>> {
  return apiFetch<FilterResponse<Carrier>>('/api/public/carriers', {
    params: params as Record<string, string | number | undefined>,
  });
}

export async function getCarrier(id: string): Promise<Carrier> {
  return apiFetch<Carrier>(`/api/public/carriers/${id}`);
}

export async function getCarrierJobs(carrierId: string, params?: {
  filter?: string;
  limit?: number;
  page?: number;
  sort?: string;
}): Promise<FilterResponse<ApiJob>> {
  return apiFetch<FilterResponse<ApiJob>>(`/api/public/carriers/${carrierId}/jobs`, {
    params: params as Record<string, string | number | undefined>,
  });
}

export async function submitContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  return apiFetch('/api/public/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─── Insights Types ───

export interface InsightsSummary {
  totalJobs: number;
  avgWeeklyPay: number;
  medianPay: number;
  p90Pay: number;
  avgSignOnBonus: number;
  jobsWithSignOnBonus: number;
  jobsWithPets: number;
  jobsWithRiders: number;
}

export interface InsightsByType {
  type: string;
  count: number;
  avgPay: number;
}

export interface InsightsByState {
  state: string;
  count: number;
  avgPay: number;
}

export interface InsightsResponse {
  summary: InsightsSummary;
  byEmploymentType: InsightsByType[];
  byRouteType: InsightsByType[];
  byState: InsightsByState[];
}

export async function getInsights(): Promise<InsightsResponse> {
  return apiFetch<InsightsResponse>('/api/public/insights');
}

// ─── Helpers ───

export function formatSalary(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
