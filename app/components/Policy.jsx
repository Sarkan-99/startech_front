"use client"
import { Card } from 'primereact/card'
import { ScrollTop } from 'primereact/scrolltop';
import React , { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Link from 'next/link';
import { Button } from 'primereact/button';


const Policy = () => {
    var privacyNpolicy  = `Je déclare par la présente n'avoir aucun conflit d'intérêts avec l’équipe ou le porteur de projet soumis dans le cadre de la compétition Starteck Africa 24. 
                           Je m'engage à informer immédiatement la Présidence de l’Université si, avant ou pendant l'exécution de mes tâches d'évaluation, je constate l'existence d'un conflit d'intérêts. 
                           Je m'engage également à respecter la confidentialité de toutes les informations qui me seront confiées et à traiter les données personnelles que je recevrai uniquement dans le cadre de l'exécution de la présente évaluation. 
                           Si des données personnelles inutiles ou excessives sont contenues dans les documents remis au cours de cette évaluation, je m'engage à cesser immédiatement de les traiter et à ne pas les prendre en considération dans le cadre de l'exécution de mes tâches. 
                           Je m'engage également à ne pas divulguer les informations confidentielles qui me seront révélées ou que je découvrirai, en dehors du panel, et à ne pas faire un usage préjudiciable de ces informations.
                           En cochant la case ci-dessous, je reconnais avoir pris connaissance et accepté cette déclaration avant d'accéder à l'application.
                           `
    const [accepted, setAccepted] = useState(false);

    const onAcceptanceChange = (value) => {
        setAccepted(!accepted);
    };
                           return (
                            <div className="flex items-center justify-center h-screen w-screen bg-black/30">
                                <Card className="h-4/5 w-1/2 p-0 overflow-hidden">
                                    {/* Title */}
                                    <div className="sticky top-0 z-10 bg-gray-100">
                                        <p className="p-5 pl-10 m-0 font-semibold text-lg" style={{ borderBottom: '1px solid #d1d5db' }}>
                                        Déclaration de confidentialité et Prévenir les conflits d’intérêts                                        </p>
                                    </div>
                        
                                    {/* Scroll */}
                                    <div className="overflow-y-auto h-2/3" style={{ borderBottom: '1px solid #d1d5db' }}>
                                        <p className="font-sans text-base px-16 pb-5 m-0 leading-loose" style={{ whiteSpace: 'pre-line' }}>
                                            {privacyNpolicy}
                                        </p>
                                        <ScrollTop target=".custom-scrollbar" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                                    </div>

                                    {/* checkBox */}
                                    <div>
                                        <div className="m-3 ml-10">
                                            <div className="flex align-items-center">
                                            <Checkbox
                                                id="privacy-policy"
                                                name="policy"
                                                value="PrivacyPolicy"
                                                onChange={onAcceptanceChange}
                                                checked={accepted}
                                            />
                                            <label htmlFor="privacy-policy" className="ml-1 mt-1 text-xs">
                                            J&apos;accepte</label>
                                            </div>
                                        </div>
                                            <div className="relative w-full flex justify-end mt-4">
                                                <Link href={accepted ? "/home" : "#"} passHref>
                                                    <Button className={`mr-5 ${!accepted ? 'disabled-link' : ''}`} label="J'accepte" severity="success" disabled={!accepted} />
                                                    </Link>
                                        
                                            </div>
                                        </div>
                                </Card>
                            </div>
                        );
                        
                        
                        
                        
                        
                        

    
}

export default Policy
