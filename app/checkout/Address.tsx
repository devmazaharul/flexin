'use client';

import React, { useEffect, useState } from 'react';
import { divisionData, districData, upazilaData, unionData } from '@/lib/addressData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { MapPin, MoveRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useAddressStore } from '@/hook/useAddressStore';

export default function Address() {

  const [note, setnote] = useState("")

  const {
    divisionId,
    districtId,
    upazilaId,
    unionId,
    setDivisionId,
    setDistrictId,
    setUpazilaId,
    setUnionId,
    setTotalAddress,
  } = useAddressStore();

  const filteredDistricts = districData.filter(
    (item) => parseInt(item.division_id) === parseInt(divisionId)
  );
  const filteredUpazilas = upazilaData.filter(
    (item) => parseInt(item.district_id) === parseInt(districtId)
  );
  const filteredUnions = unionData.filter(
    (item) => parseInt(item.upazilla_id) === parseInt(upazilaId)
  );

  const selectedDivision = divisionData.find(
    (item) => parseInt(item.id) === parseInt(divisionId)
  );
  const selectedDistrict = districData.find(
    (item) => parseInt(item.id) === parseInt(districtId)
  );
  const selectedUpazila = upazilaData.find(
    (item) => parseInt(item.id) === parseInt(upazilaId)
  );
  const selectedUnion = unionData.find(
    (item) => parseInt(item.id) === parseInt(unionId)
  );

  const makeAddressObject =
    divisionId && districtId && upazilaId && unionId
      ? {
          division: selectedDivision?.bn_name || '',
          district: selectedDistrict?.bn_name || '',
          upazila: selectedUpazila?.bn_name || '',
          union: selectedUnion?.bn_name || '',
          note:note || 'no note here'
        }
      : undefined;

const isChnage=JSON.stringify(makeAddressObject)
  useEffect(() => {
    if (makeAddressObject) {
      setTotalAddress(makeAddressObject);
    }
  }, [isChnage]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Division */}
        <div className="w-full">
          <Select value={divisionId} onValueChange={setDivisionId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {divisionData.map((division) => (
                <SelectItem key={division.id} value={division.id.toString()}>
                  {division.bn_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="w-full">
          <Select
            value={districtId}
            onValueChange={setDistrictId}
            disabled={!divisionId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {filteredDistricts.map((district) => (
                <SelectItem key={district.id} value={district.id.toString()}>
                  {district.bn_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upazila */}
        <div className="w-full">
          <Select
            value={upazilaId}
            onValueChange={setUpazilaId}
            disabled={!districtId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Upazila" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {filteredUpazilas.map((upazila) => (
                <SelectItem key={upazila.id} value={upazila.id.toString()}>
                  {upazila.bn_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Union */}
        <div className="w-full">
          <Select
            value={unionId}
            onValueChange={setUnionId}
            disabled={!upazilaId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Union" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {filteredUnions.map((union) => (
                <SelectItem key={union.id} value={union.id.toString()}>
                  {union.bn_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      {/* Notes */}
      </div>

      <div className="w-full">
  <Textarea
  className='w-full'
    placeholder="Write your note here..."
    value={note}
    onChange={(e) => setnote(e.target.value)}
    disabled={!unionId}
  />
</div>

      {makeAddressObject && (
        <div className="p-3 rounded-xl w-full border border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <MapPin size={18} color="blue" /> Selected Address
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              {makeAddressObject.division} <MoveRight size={14} />
            </span>
            <span className="flex items-center gap-1">
              {makeAddressObject.district} <MoveRight size={14} />
            </span>
            <span className="flex items-center gap-1">
              {makeAddressObject.upazila} <MoveRight size={14} />
            </span>
            <span className="flex items-center gap-1">{makeAddressObject.union}</span>
          </div>
        </div>
      )}
    </div>
  );
}