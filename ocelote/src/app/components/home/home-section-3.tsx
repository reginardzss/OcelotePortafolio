'use client';
import Image from 'next/image';
import useIsMobile from "@/app/hooks/useIsMobile";


export default function HomeSectionThree() {
    const isMobile = useIsMobile();
    return(
        <div className="bg-oceloteRed w-screen h-[70lvh] p-8 text-center overflow-hidden">
            
                {isMobile ? (
                    <div className='grid grid-rows-2 text-4xl'>
                        <div>PONTE EN CONTACTO</div>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 gap-4 text-6xl '>
                        <div className='flex flex-col items-center justify-start gap-16'>
                            <div>PONTE EN CONTACTO</div>
                            <Image
                                src='/assets/ocelote-redondo4x.png'
                                alt='ocelote-redondo'
                                width={300}
                                height={300}
                            />
                        </div>
                        <div>
                        <Image
                                src='/assets/blob.svg'
                                alt='ocelote-redondo'
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                )}
        </div>
    )
};