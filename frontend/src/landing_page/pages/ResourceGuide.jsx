import React from "react";
import GuideCard from "../components/GuideCard"; 
import "../pages/GuideCard.css";

export default function ResourceGuide(){
    const guideResources =[{
        id:"guide-1",
        title:"Stress Management",
        type:"pdf",
        link:"assests/guides/Stress_Management.pdf",
        description:
        "A comprehensive guide on managing stress",
        meta:{source:"Cleveland Clinic",year:"2024",length:"1 page"},
    },
    {
        id:"guide-2",
        title:"Coping with anxiety",
        type:"pdf",
        link:"assests/guides/Coping_anxiety.pdf",
        description:
        "11 tips for coping with an anxiety disorder",
        meta:{source:"Mayo Clinic Health System",year:"2024",length:"3 page"},
    },
    {
        id:"guide-3",
        title:"5 Meditation techniques",
        type:"pdf",
        link:"assests/guides/Meditation_techniques.pdf",
        description:
        "Meditation Techniques to Stop Negative Thought Patterns",
        meta:{source:"Higher Self Yoga",year:"2025",length:"3 page"},
    },];

    return(
        <div className="container py-5 px-5 mx-5">
            <h2 className="mb-3 text-center guide-heading">Stress Management</h2>
            <p className="text-center text-muted mb-4 mt-2">
                Explore our curated resources to help you manage stress effectively and improve your emotional well-being.
            </p>

            <div className="row">
            {guideResources.map((res) => (
            <div className="col-4" key={res.id}>
                <GuideCard {...res} />
            </div>
            ))}
            </div>
        </div>
    );
}