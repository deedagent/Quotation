function generatePDF() {
    // Get form values
    const societyName = document.getElementById('societyName').value;
    const location = document.getElementById('location').value;
    const dateInput = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;

    // Validate input fields
    if (!societyName || !location || !dateInput || !amount) {
        alert("Please fill out all the fields!");
        return;
    }

    // Format the date as dd/mm/yyyy
    const dateParts = dateInput.split('-'); // Split yyyy-mm-dd
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Rearrange to dd/mm/yyyy

    // Update printable content
    document.getElementById('societyNameDisplay1').innerText = societyName;
    document.getElementById('locationDisplay1').innerText = location;
    document.getElementById('proposalDate').innerText = formattedDate; 
    document.getElementById('societyNameDisplay2').innerText = societyName;
    document.getElementById('locationDisplay2').innerText = location;
    document.getElementById('amountDisplay').innerText = amount;

    // Hide the form and show printable content
    const formSection = document.getElementById('quotationForm');
    const proposalContent = document.getElementById('proposalContent');
    formSection.style.display = 'none';
    proposalContent.style.display = 'block';

    // Generate PDF using html2pdf.js
    html2pdf().from(proposalContent).set({
        margin:0.5,
        filename: `${societyName}_Conveyance_Deed_Proposal.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save().then(() => {
        // Restore form and hide printable content after generating PDF
        formSection.style.display = 'block';
        proposalContent.style.display = 'none';
    });
}
