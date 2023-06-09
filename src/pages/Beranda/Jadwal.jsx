import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Image } from "primereact/image";
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from "primereact/inputswitch";
import ModalPassengers from "../../components/modal_beranda/ModalPassengers";
import ModalSeatClass from "../../components/modal_beranda/ModalSeatClass";
import ModalFlightFrom from "../../components/modal_beranda/ModalFlightFrom";
import ModalFlightTo from "../../components/modal_beranda/ModalFlightTo";
import { addLocale } from 'primereact/api';


import icon_pesawat from "../../assets/images/icon_pesawat.svg"
import icon_date from "../../assets/images/icon_date.svg"
import garis1 from "../../assets/images/garis.svg"
import garis_pendek1 from "../../assets/images/garis_pendek.svg"
import garis_pendek2 from "../../assets/images/garis_pendek2.svg"
import return1 from "../../assets/images/return.svg"
import airline_seat from "../../assets/images/airline-seat.svg"


const JadwalPenerbangan = (onFilterData) => {
    const { flightData } = useSelector((state) => state.FlightDestinationReducer);
    console.log(flightData)
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [checked, setChecked] = useState(false);
    const [from, setFrom] = useState("Duesseldorf");
    const [to, setTo] = useState("Brazil");
    const [matchingFlights, setMatchingFlights] = useState([]);


    const handleDateClick = () => {
        setShowCalendar(!showCalendar); // Mengubah state showCalendar saat elemen diklik
    };
    const handleFromSelect = (value) => {
        setFrom(value);
    };

    const handleToSelect = (value) => {
        setTo(value);
    };

    const return1Handler = () => {
        setFrom(to);
        setTo(from);
    }

    const handleDate1Change = (e) => {
        setSelectedDate1(e.value)
        setShowCalendar(false);
    }

    const handleDate2Change = (e) => {
        if (selectedDate1 && e.value && e.value < selectedDate1) {
            setSelectedDate2(null);
        } else {
            setSelectedDate2(e.value);
        }
    }
    const dateOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };

    const buttonHandler = () => {
        const filteredFlights = flightData.filter((flight) => {
            // Ubah kondisi sesuai dengan kriteria pencarian pengguna
            const isFromMatch = flight.source.city.toLowerCase() === from.toLowerCase();
            const isToMatch = flight.destination.country.toLowerCase() === to.toLowerCase();

            return isFromMatch && isToMatch;
        });

        setMatchingFlights(filteredFlights);

        if (filteredFlights.length > 0) {
            alert("Ada data penerbangan yang sesuai!");
        } else {
            alert("Tidak ada data penerbangan yang sesuai!");
        }

    }

    const handleFromChange = (value) => {
        setFrom(value);
    };

    const handleToChange = (value) => {
        setTo(value);
    };

    const handleFromBlur = (event) => {
        const value = event.target.value;
        setFrom(value);
    };

    const handleToBlur = (event) => {
        const value = event.target.value;
        setTo(value);
    };

    const handleToFocus = () => {
        setTo(from);
        setFrom("");
    };

    // addLocale('es', {
    //     firstDayOfWeek: 1,
    //     dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //     dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    //     monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    //     monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'],
    // });

    return (
        <div className="relative lg:max-w-screen-md rounded-lg shadow-lg mx-auto bg-white -mt-12">
            <div className="py-4 px-5">
                <p className="text-lg">Pilih Jadwal Penerbangan spesial di<span className=" text-primary2"> TerbangIn!</span></p>
                <div className="grid grid-cols-3 mt-3">
                    <div>
                        <div className="flex items-center">
                            <Image src={icon_pesawat} alt="icon_pesawat" className="w-4" />
                            <p className="text-primary1 text-xs md:text-base ml-2 mr-2 ">From</p>
                            <div >
                                <ModalFlightFrom
                                    value={from}
                                    onChange={handleFromChange}
                                    onSelect={handleFromSelect}
                                    onBlur={handleFromBlur}
                                />
                            </div>
                        </div>
                        <hr className="flex border-1 mx-[85px] w-60" />
                        <div className="">
                            <div className="flex items-center mx-10 mt-7">
                                <div className="text-base text-primary1 mx-10">Departure</div>
                                <div className="text-base text-primary1 mx-6">Return</div>
                                <div><InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} /></div>
                            </div>
                            <div className="flex items-center lg:mt-2 -mr-28">
                                <Image src={icon_date} alt="icon_date" className="w-4 md:w-6" />
                                <div className="text-base text-primary1 px-2">Date</div>
                                <Calendar value={selectedDate1} onChange={handleDate1Change} numberOfMonths={2} dateFormat="dd MM yy" className="w-56 h-7 px-3 " />
                                <Calendar value={selectedDate2} onChange={handleDate2Change} numberOfMonths={2} disabled={!checked} minDate={selectedDate1} dateFormat="dd MM yy" className="w-48 h-7 px-2 pr-2 mr-3" />
                            </div>
                            <div className="pt-1">
                                <hr className="flex border-1 mx-20 w-32" />
                                <hr className="border-1 mx-56 w-32" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto"><Image src={return1} alt="return1" onClick={return1Handler} className="cursor-pointer w-4" /></div>
                    <div className="-ml-24 -mr-4">
                        <div className="flex items-center">
                            <Image src={icon_pesawat} alt="icon_pesawat" className="w-6 mr-2 ml-1 sm:w-4 lg:ml-4" />
                            <p className="text-primary1 text-xs md:text-base mr-2">To</p>
                            <div>
                                <ModalFlightTo
                                    value={to}
                                    onChange={handleToChange}
                                    onSelect={handleToSelect}
                                    onBlur={handleToBlur}
                                    onFocus={handleToFocus}
                                />
                            </div>
                        </div>
                        <hr className="flex border-1 mx-[93px] w-60" />
                        <div className="mx-4 -mr-10">
                            <div className="flex mx-6 mt-8">
                                <div className="text-base text-primary1 mx-10">Passengers</div>
                                <div className="text-base text-primary1 mx-5">Seat Class</div>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src={airline_seat} alt="airline_seat" className="w-4 sm:w-5 md:w-6" />
                                <div className="text-base text-primary1">To</div>
                                <ModalPassengers />
                                <ModalSeatClass />
                            </div>
                            <hr className="flex border-1 mx-16 w-28" />
                            <hr className="border-1 mx-[216px] w-[96px]" />
                        </div>

                    </div>
                </div>

            </div>
            <div className="bg-primary2 rounded-b-xl">
                <p className="text-center text-xs lg:text-base text-white font-bold cursor-pointer pt-2 pb-2 lg:pt-4 lg:pb-4" onClick={buttonHandler}>Cari Penerbangan</p>
            </div>
        </div >
        // <div className="flex flex-row rounded-xl shadow-lg bg-blue-400">
        //     <div className="grid grid-cols-2">
        //         <div className="grid grid-flow-row">1
        //         </div>
        //         <div>2</div>
        //     </div>
        // </div>
        // <div className="flex justify-center">
        //     <div className="relative flex flex-col border-2 rounded-lg shadow-lg bg-white -mt-4 sm:-mt-8 md:-mt-6 md:mr-10 lg:-mt-12 lg:ml-10">
        //         <div className="sm:ml-3 sm:mt-2 lg:ml-6">
        //             <h1 className="text-base font-bold pb-3">Pilih Jadwal Penerbangan spesial di<span className=" text-primary2"> TerbangIn!</span></h1>
        //         </div>
        //         <div className="grid grid-cols-2 gap-1 mt-2 ml-1 sm:ml-3 lg:ml-6">
        //             <div className="flex items-center">
        //                 <Image src={icon_pesawat} alt="icon_pesawat" className="w-4" />
        //                 <p className="text-primary1 text-xs md:text-base ml-2 mr-2 ">From</p>
        //                 <ModalFlightFrom
        //                     value={from}
        //                     onChange={handleFromChange}
        //                     onSelect={handleFromSelect}
        //                     onBlur={handleFromBlur}
        //                 />
        //             </div>
        //             <div className="flex items-center">
        //                 <Image src={return1} alt="return1" onClick={return1Handler} className="cursor-pointer w-4 mr-2 md:w-7 lg:w-8 lg:-ml-8" />
        //                 <Image src={icon_pesawat} alt="icon_pesawat" className="w-6 mr-2 ml-1 sm:w-4 lg:ml-4" />
        //                 <p className="text-primary1 text-xs md:text-base mr-2">To</p>
        //                 <ModalFlightTo
        //                     value={to}
        //                     onChange={handleToChange}
        //                     onSelect={handleToSelect}
        //                     onBlur={handleToBlur}
        //                     onFocus={handleToFocus}
        //                 />
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-1 mt-1 min-[481px]:mb-2 max-[510px]:mb-2 lg:ml-7">
        //             <div className="ml-16 mr-2 sm:ml-20 sm:mr-8 lg:ml-20 lg:mr-12">
        //                 <Image src={garis1} alt="garis1" />
        //             </div>
        //             <div className="ml-16 mr-2 sm:ml-20 sm:mr-4 lg:ml-24">
        //                 <Image src={garis1} alt="garis1" />
        //             </div>
        //         </div>
        //         <div className="pl-32 sm:hidden">
        //             <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
        //         </div>
        //         <div className="grid grid-cols-2 gap-1 sm:mt-4">
        //             <div className="flex items-center pl-8">
        //                 <p className="text-primary1 text-xs md:text-base mr-2 sm:ml-12 lg:ml-24">Departure</p>
        //                 <p className="text-primary1 text-xs md:text-base pl-3 sm:ml-5 lg:ml-16">Return</p>
        //                 <p className="hidden sm:flex sm:ml-8 lg:ml-16"><InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} /></p>

        //             </div>
        //             <div className="flex items-center sm:ml-4">
        //                 <p className="text-primary1 text-xs md:text-base ml-8 sm:ml-16 lg:ml-24">Passenger</p>
        //                 <p className="text-primary1 text-xs md:text-base ml-6 sm:ml-20">Seat Class</p>
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-1 mb-2 sm:ml-3 sm:mb-1 lg:ml-6">
        //             <div className="flex items-center lg:mt-2">
        //                 <Image src={icon_date} alt="icon_date" className="w-4 md:w-6" />
        //                 <p className="text-primary1 text-xs md:text-base ml-1 sm:ml-2">Date</p>
        //                 <Calendar value={selectedDate1} onChange={handleDate1Change} numberOfMonths={2} dateFormat="dd/mm/yy" className="w-8 sm:w-16 md:w-40 lg:w-32 h-2 ml-1 sm:ml-5 md:h-7 md:pl-3 lg:pl-5 lg:mr-1" />
        //                 <Calendar value={selectedDate2} onChange={handleDate2Change} numberOfMonths={2} disabled={!checked} minDate={selectedDate1} dateFormat="dd/mm/yy" className="w-8 sm:w-16 md:w-36 lg:w-32 h-2 ml-6 sm:ml-7 md:h-7 md:pl-2 lg:pl-4" />
        //             </div>
        //             <div className="flex items-center sm:ml-4">
        //                 <Image src={airline_seat} alt="airline_seat" className="w-4 sm:w-5 md:w-6 md:ml-2" />
        //                 <p className="mr-1 text-primary1 text-xs md:text-sm lg:text-base md:mr-0 md:ml-1">To</p>
        //                 <ModalPassengers />
        //                 <ModalSeatClass />
        //             </div>
        //         </div>
        //         <div className="grid grid-cols-2 gap-1 mb-3">
        //             <div className="flex pt-2 sm:pt-3 sm:ml-3 lg:ml-8">
        //                 <Image src={garis_pendek1} alt="garis_1" className="ml-3 mr-2 sm:ml-16 lg:ml-24 lg:mr-4" />
        //                 <Image src={garis_pendek2} alt="garis_2" className="ml-1 sm:mr-6" />
        //             </div>
        //             <div className="flex pt-2 sm:pt-1 sm:ml-1 lg:ml-4">
        //                 <Image src={garis_pendek1} alt="garis_pendek1" className="pl-4 sm:ml-14 lg:ml-20" />
        //                 <Image src={garis_pendek2} alt="garis_pendek2" className="pl-4 sm:mr-4" />
        //             </div>
        //         </div>

        //         <div className="bg-primary2 rounded-b-lg ">
        //             <p className="text-center text-xs lg:text-base text-white font-bold cursor-pointer pt-2 pb-2 lg:pt-4 lg:pb-4" onClick={buttonHandler}>Cari Penerbangan</p>
        //         </div>

        //     </div>
        // </div>
    )
}

export default JadwalPenerbangan;