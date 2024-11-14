"use client"
import { Card } from 'primereact/card'
import { ScrollTop } from 'primereact/scrolltop';
import React , { useState } from 'react';
import Checkbox from '../components/Checkbox';
import Link from 'next/link';
import { Button } from 'primereact/button';

const Policy = ({ setValidation }) => {
    const [accepted, setAccepted] = useState(false);
    const privacyNpolicy = `Je déclare par la présente n'avoir aucun conflit d'intérêts avec l’équipe ou le porteur de projet soumis dans le cadre de la compétition Starteck Africa 24. 
                           Je m'engage à informer immédiatement la Présidence de l’Université si, avant ou pendant l'exécution de mes tâches d'évaluation, je constate l'existence d'un conflit d'intérêts. 
                           Je m'engage également à respecter la confidentialité de toutes les informations qui me seront confiées et à traiter les données personnelles que je recevrai uniquement dans le cadre de l'exécution de la présente évaluation. 
                           Si des données personnelles inutiles ou excessives sont contenues dans les documents remis au cours de cette évaluation, je m'engage à cesser immédiatement de les traiter et à ne pas les prendre en considération dans le cadre de l'exécution de mes tâches. 
                           Je m'engage également à ne pas divulguer les informations confidentielles qui me seront révélées ou que je découvrirai, en dehors du panel, et à ne pas faire un usage préjudiciable de ces informations.
                           En cochant la case ci-dessous, je reconnais avoir pris connaissance et accepté cette déclaration avant d'accéder à l'application.`;

    const onAcceptanceChange = () => {
        setAccepted(!accepted);
    };

    const validate = () => {
        setValidation(true);
    };

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen bg-gray-100 bg-opacity-80 z-10 px-4 sm:px-8">
            <Card className="h-4/5 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 p-0 overflow-hidden">
                {/* Title */}
                <div className="sticky top-0 z-10 bg-gray-100">
                    <p className="p-5 pl-6 sm:pl-10 m-0 font-semibold text-lg sm:text-xl" style={{ borderBottom: '1px solid #d1d5db' }}>
                        Déclaration de confidentialité et Prévenir les conflits d’intérêts
                    </p>
                </div>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto h-2/3 pt-5 px-6 sm:px-8 lg:px-12" style={{ borderBottom: '1px solid #d1d5db' }}>
                    <p className="font-sans text-sm sm:text-base pb-5 m-0 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                        {privacyNpolicy}
                    </p>
                    <ScrollTop target=".custom-scrollbar" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
                </div>
                
                {/* Checkbox and Button */}
                <div>
                    <div className="m-3 ml-6 sm:ml-10">
                        <div className="flex items-center">
                            <Checkbox
                                id="privacy-policy"
                                name="policy"
                                value="PrivacyPolicy"
                                onChange={onAcceptanceChange}
                                checked={accepted}
                            />
                            <label htmlFor="privacy-policy" className="ml-2 text-xs sm:text-sm">
                                J&apos;accepte
                            </label>
                        </div>
                    </div>

                    {/* Accept Button */}
                    <div className="w-full flex justify-end mt-4 mr-6 sm:mr-8">
                        <Button label="J'accepte" severity="primary" disabled={!accepted} onClick={validate} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Policy;
