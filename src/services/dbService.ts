import { supabase } from '../supabaseClient';
import { ReferralRecord, AppointmentRecord, AdmissionRecord } from '../types';

export const dbService = {
  // --- Referrals ---
  async getReferrals() {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .order('sn', { ascending: true });
    if (error) throw error;
    return data.map(this.mapReferralFromDb);
  },

  async saveReferral(record: ReferralRecord) {
    const dbRecord = this.mapReferralToDb(record);
    const { data, error } = await supabase
      .from('referrals')
      .upsert(dbRecord)
      .select()
      .single();
    if (error) throw error;
    return this.mapReferralFromDb(data);
  },

  async deleteReferral(id: string) {
    const { error } = await supabase
      .from('referrals')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Appointments ---
  async getAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('sn', { ascending: true });
    if (error) throw error;
    return data.map(this.mapAppointmentFromDb);
  },

  async saveAppointment(record: AppointmentRecord) {
    const dbRecord = this.mapAppointmentToDb(record);
    const { data, error } = await supabase
      .from('appointments')
      .upsert(dbRecord)
      .select()
      .single();
    if (error) throw error;
    return this.mapAppointmentFromDb(data);
  },

  async deleteAppointment(id: string) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Admissions ---
  async getAdmissions() {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('sn', { ascending: true });
    if (error) throw error;
    return data.map(this.mapAdmissionFromDb);
  },

  async saveAdmission(record: AdmissionRecord) {
    const dbRecord = this.mapAdmissionToDb(record);
    const { data, error } = await supabase
      .from('admissions')
      .upsert(dbRecord)
      .select()
      .single();
    if (error) throw error;
    return this.mapAdmissionFromDb(data);
  },

  async deleteAdmission(id: string) {
    const { error } = await supabase
      .from('admissions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Mappers ---
  mapReferralToDb(r: ReferralRecord) {
    return {
      id: r.id.includes('-') ? r.id : undefined, // Only send UUIDs
      sn: r.sn,
      mrn: r.mrn,
      arrival_date: r.arrivalDate || null,
      arrival_time: r.arrivalTime || null,
      patient_name: r.patientName,
      age: r.age,
      sex: r.sex,
      woreda: r.woreda,
      kebele: r.kebele,
      referral_in_type: r.referralInType,
      referral_out_type: r.referralOutType,
      referral_type: r.referralType,
      cold_case_type: r.coldCaseType,
      referred_from: r.referredFrom,
      referral_date: r.referralDate || null,
      referral_time: r.referralTime || null,
      reason_for_referral: r.reasonForReferral,
      diagnosis: r.diagnosis,
      referred_to: r.referredTo,
      transportation: r.transportation,
      accompanied_by: r.accompaniedBy,
      referred_by_name: r.referredByName,
      referred_by_qualification: r.referredByQualification,
      feedback_received: r.feedbackReceived,
    };
  },

  mapReferralFromDb(r: any): ReferralRecord {
    return {
      id: r.id,
      sn: r.sn,
      mrn: r.mrn || '',
      arrivalDate: r.arrival_date || '',
      arrivalTime: r.arrival_time || '',
      patientName: r.patient_name || '',
      age: r.age || '',
      sex: r.sex || '',
      woreda: r.woreda || '',
      kebele: r.kebele || '',
      referralInType: r.referral_in_type || '',
      referralOutType: r.referral_out_type || '',
      referralType: r.referral_type || '',
      coldCaseType: r.cold_case_type || '',
      referredFrom: r.referred_from || '',
      referralDate: r.referral_date || '',
      referralTime: r.referral_time || '',
      reasonForReferral: r.reason_for_referral || '',
      diagnosis: r.diagnosis || '',
      referredTo: r.referred_to || '',
      transportation: r.transportation || '',
      accompaniedBy: r.accompanied_by || '',
      referredByName: r.referred_by_name || '',
      referredByQualification: r.referred_by_qualification || '',
      feedbackReceived: r.feedback_received || false,
    };
  },

  mapAppointmentToDb(r: AppointmentRecord) {
    return {
      id: r.id.includes('-') ? r.id : undefined,
      sn: r.sn,
      date_of_visit: r.dateOfVisit || null,
      mrn: r.mrn,
      patient_name: r.patientName,
      age: r.age,
      sex: r.sex,
      region: r.region,
      zone: r.zone,
      woreda: r.woreda,
      kebele: r.kebele,
      phone_no: r.phoneNo,
      diagnosis: r.diagnosis,
      day_of_appointment: r.dayOfAppointment || null,
      room_ward: r.roomWard,
      appointment_given_by: r.appointmentGivenBy,
      is_procedure_done: r.isProcedureDone,
      cancellation_reason: r.cancellationReason,
      date_of_admission: r.dateOfAdmission || null,
      date_of_surgery: r.dateOfSurgery || null,
      date_of_discharge: r.dateOfDischarge || null,
      outcome: r.outcome,
      remark: r.remark,
    };
  },

  mapAppointmentFromDb(r: any): AppointmentRecord {
    return {
      id: r.id,
      sn: r.sn,
      dateOfVisit: r.date_of_visit || '',
      mrn: r.mrn || '',
      patientName: r.patient_name || '',
      age: r.age || '',
      sex: r.sex || '',
      region: r.region || '',
      zone: r.zone || '',
      woreda: r.woreda || '',
      kebele: r.kebele || '',
      phoneNo: r.phone_no || '',
      diagnosis: r.diagnosis || '',
      dayOfAppointment: r.day_of_appointment || '',
      roomWard: r.room_ward || '',
      appointmentGivenBy: r.appointment_given_by || '',
      isProcedureDone: r.is_procedure_done || '',
      cancellationReason: r.cancellation_reason || '',
      dateOfAdmission: r.date_of_admission || '',
      dateOfSurgery: r.date_of_surgery || '',
      dateOfDischarge: r.date_of_discharge || '',
      outcome: r.outcome || '',
      remark: r.remark || '',
    };
  },

  mapAdmissionToDb(r: AdmissionRecord) {
    return {
      id: r.id.includes('-') ? r.id : undefined,
      sn: r.sn,
      mrn: r.mrn,
      patient_name: r.patientName,
      age: r.age,
      sex: r.sex,
      woreda: r.woreda,
      kebele: r.kebele,
      date_of_admission: r.dateOfAdmission || null,
      time_of_admission: r.timeOfAdmission || null,
      ward_room: r.wardRoom,
      admitting_diagnosis: r.admittingDiagnosis,
      admitting_staff: r.admittingStaff,
      date_of_discharge: r.dateOfDischarge || null,
      time_of_discharge: r.time_of_discharge || null,
      discharge_diagnosis: r.dischargeDiagnosis,
      outcome: r.outcome,
      remark: r.remark,
    };
  },

  mapAdmissionFromDb(r: any): AdmissionRecord {
    return {
      id: r.id,
      sn: r.sn,
      mrn: r.mrn || '',
      patientName: r.patient_name || '',
      age: r.age || '',
      sex: r.sex || '',
      woreda: r.woreda || '',
      kebele: r.kebele || '',
      dateOfAdmission: r.date_of_admission || '',
      timeOfAdmission: r.time_of_admission || '',
      wardRoom: r.ward_room || '',
      admittingDiagnosis: r.admitting_diagnosis || '',
      admittingStaff: r.admitting_staff || '',
      dateOfDischarge: r.date_of_discharge || '',
      timeOfDischarge: r.time_of_discharge || '',
      dischargeDiagnosis: r.discharge_diagnosis || '',
      outcome: r.outcome || '',
      remark: r.remark || '',
    };
  }
};
