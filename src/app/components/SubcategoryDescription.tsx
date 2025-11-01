import React from "react";

interface DescriptionSection {
    type: 'paragraph' | 'heading' | 'orderedList' | 'unorderedList';
    content?: string;
    items?: string[];
}

interface SubcategoryDescriptionProps {
    sections: DescriptionSection[];
}

const SubcategoryDescription: React.FC<SubcategoryDescriptionProps> = ({ sections }) => {
    return (
        <div className="mt-7.5 font-[600] shadow-xs p-7.5 rounded-lg">
            {sections.map((section, index) => {
                switch (section.type) {
                    case 'paragraph':
                        return (
                            <p key={index} className="text-[#2c3a54] mb-5">
                                {section.content}
                            </p>
                        );
                    case 'heading':
                        return (
                            <h2
                                key={index}
                                className="text-[24px] font-bold text-[#2c3a54] mb-3.75"
                            >
                                {section.content}
                            </h2>
                        );
                    case 'orderedList':
                        return (
                            <ol
                                key={index}
                                className="list-decimal pl-5 text-[#2c3a54] space-y-1 mb-5"
                            >
                                {section.items?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>
                        );
                    case 'unorderedList':
                        return (
                            <ul
                                key={index}
                                className="list-disc pl-5 text-[#2c3a54] space-y-1 mb-5"
                            >
                                {section.items?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default SubcategoryDescription;