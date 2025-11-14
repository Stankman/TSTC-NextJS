import { Heading, Section } from "@/components/global/craft";
import Image from "next/image";

export default function PartnersBlock() {
    return (
        <Section>
            <Heading size="h3" className="font-bold text-center">The Network Driving Change</Heading>
            <p className="text-center mb-4">The WorkSITE connects Central Texas industries, from manufacturing and energy to healthcare and IT, with the training solutions they need most. Through collaboration with workforce and industry partners, we ensure programs are built around real employer needs, high-demand skills, and career opportunities that drive regional growth.</p>
            <div className="flex items-center justify-center flex-wrap gap-5">
                <div className="
                    group inline-block w-40 h-15
                    bg-gray-500 transition-colors hover:bg-gray-900
                    [mask:url('https://worksite.org/wp-content/uploads/sites/2/2025/01/UU_Logo_Black_Claim_RGB_INT_2020-09-1.svg')_center/contain_no-repeat]
                    [-webkit-mask:url('https://worksite.org/wp-content/uploads/sites/2/2025/01/UU_Logo_Black_Claim_RGB_INT_2020-09-1.svg')_center/contain_no-repeat]" />
                <div className="
                    group inline-block w-40 h-15
                    bg-gray-500 transition-colors hover:bg-gray-900
                    [mask:url('https://www.tstc.edu/demo-worksite/wp-content/uploads/sites/2/2024/12/Fallas-Logo-01.svg')_center/contain_no-repeat]
                    [-webkit-mask:url('https://www.tstc.edu/demo-worksite/wp-content/uploads/sites/2/2024/12/Fallas-Logo-01.svg')_center/contain_no-repeat]" />
            </div>
        </Section>
    );
}