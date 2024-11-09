"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CustomFilterProps, OptionProps } from '@/types';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({ title, options, setFilter }: CustomFilterProps) => {
  // Select the first option if available, or set a default object if `options` is empty
  const router = useRouter();
  const [selected, setSelected] = useState<OptionProps>(
    options?.length > 0 ? options[0] : { title: 'Select an option', value: '' }
  );


  return (
    <div className="w-fit">
      <Listbox value={selected} 
      onChange={(e) => {
        setSelected(e);
        setFilter(e.value);
      }}>
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>
          <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {(options || []).map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>

          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
