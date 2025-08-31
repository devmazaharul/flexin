import { create } from "zustand";

export interface TotalAddress {
  division: string;
  district: string;
  upazila: string;
  union: string;
}

interface AddressState {
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionId: string;
  totalAddress: TotalAddress;
  setDivisionId: (id: string) => void;
  setDistrictId: (id: string) => void;
  setUpazilaId: (id: string) => void;
  setUnionId: (id: string) => void;
  setTotalAddress: (item: TotalAddress) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  divisionId: "",
  districtId: "",
  upazilaId: "",
  unionId: "",
  totalAddress: { division: "", district: "", upazila: "", union: "" },

  setDivisionId: (id) =>
    set(() => ({ divisionId: id, districtId: "", upazilaId: "", unionId: "" })),
  setDistrictId: (id) =>
    set(() => ({ districtId: id, upazilaId: "", unionId: "" })),
  setUpazilaId: (id) =>
    set(() => ({ upazilaId: id, unionId: "" })),
  setUnionId: (id) => set(() => ({ unionId: id })),

  setTotalAddress: (item) => set(() => ({ totalAddress: item })),
}));
