export const getTest = async () => {
    try{
        const res = await fetch("http://localhost:8081/studyMaterial",{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    
        return await res.json();
    } catch(err) {}
};