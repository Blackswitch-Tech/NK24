import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export default function DefaultAccordion() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion  open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className="hover:!text-white text-white font-pop">Will participants receive activity points for attending Nakshatra 2024?</AccordionHeader>
        <AccordionBody className="font-pop text-white">
        Activity Points are awarded in accordance with the regulations and norms established by KTU. The number of points granted varies depending on the nature of the event (Technical/Non-technical) in which the participant is involved.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className="hover:!text-white text-white font-pop">
        Will all registered participants receive a Certificate of Participation for the event?
        </AccordionHeader>
        <AccordionBody className="font-pop text-white">
        Certificates of Participation are exclusively granted to individuals who attend the event on the scheduled day. Participants who do not attend the event on the specified day are not eligible to receive the certification.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)} className="hover:!text-white text-white font-pop">
        Is transportation provided for participants attending Nakshatra 2024?
        </AccordionHeader>
        <AccordionBody className="font-pop text-white">
        Transportation arrangements can be made available for participants upon request. Those interested in availing of this service are kindly requested to contact the Transportation Head, Devika, at 94008 05672. Please inform him as soon as possible and confirm your transportation arrangements no later than 3 days prior to the event.
        </AccordionBody>
      </Accordion>
    </>
  );
}