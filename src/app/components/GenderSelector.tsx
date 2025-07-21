import { Gender } from "../types";

interface Props {
    gender : Gender;
    setGender : (gender : Gender) => void;
}

const GenderSelector = ({gender , setGender} : Props) =>{
    return(
        <div className="flex gap-4">
            {["male", "female"].map((g) =>(
                <button
                key={g}
                onClick={() => setGender(g as Gender)}
                className={`px-4 py-2 rounded ${gender === g ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {g.toUpperCase()}
                </button>
            ))}
        </div>
    )
};

export default GenderSelector;