// utils/receiptTemplate.ts
const receiptTemplate = ({ name, amount, date, roomName, status }) => {
  const newDate = date || new Date().toLocaleDateString();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary: #4f46e5;
            --success: #22c55e;
            --text: #1f2937;
            --muted: #6b7280;
        }

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 640px;
            margin: 2rem auto;
            background: white;
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
        }

        .header {
            background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
            color: white;
            padding: 2.5rem;
            text-align: center;
            position: relative;
        }

        .header h1 {
            margin: 0;
            font-weight: 600;
            font-size: 1.8rem;
            letter-spacing: -0.5px;
        }

        .logo {
            width: 60px;
            margin-bottom: 1rem;
        }

        .content {
            padding: 2.5rem;
        }

        .section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid #f3f4f6;
        }

        .section:last-child {
            border-bottom: none;
        }

        .label {
            color: var(--muted);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .value {
            color: var(--text);
            font-weight: 600;
            font-size: 1.05rem;
        }

        .amount {
            color: var(--success);
            font-size: 1.4rem;
            font-weight: 700;
        }

        .footer {
            background: #f9fafb;
            padding: 1.5rem;
            text-align: center;
            color: var(--muted);
            font-size: 0.9rem;
        }

        .status-badge {
            background: var(--success);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .watermark {
            position: absolute;
            opacity: 0.05;
            font-size: 8rem;
            font-weight: 700;
            transform: rotate(-30deg);
            pointer-events: none;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="watermark">PAID</div>
            <h1>Payment Confirmation</h1>
        </div>
        
        <div class="content">
            <div class="section">
                <span class="label">
                    <i class="fas fa-user"></i>
                    Name
                </span>
                <span class="value">${name}</span>
            </div>

            <div class="section">
                <span class="label">
                    <i class="fas fa-rupee-sign"></i>
                    Amount Paid
                </span>
                <span class="value amount">Rs.${amount.toFixed(2)}</span>
            </div>

            <div class="section">
                <span class="label">
                    <i class="fas fa-calendar-alt"></i>
                    Date
                </span>
                <span class="value">${newDate}</span>
            </div>

            <div class="section">
                <span class="label">
                    <i class="fas fa-door-open"></i>
                    Room Name
                </span>
                <span class="value">${roomName} </span>
            </div>

            <div class="section">
                <span class="label">
                    <i class="fas fa-check-circle"></i>
                    Payment Status
                </span>
                <span class="status-badge">${status}</span>
            </div>
        </div>

        <div class="footer">
            Thank you for choosing Room Finder!<br>
            For any inquiries, contact support@roomfinder.com<br>
            © ${new Date().getFullYear()} Room Finder. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
};

// `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <style>
//     body {
//       font-family: 'Segoe UI', sans-serif;
//       margin: 40px;
//       padding: 0;
//       background: #f7f7f7;
//     }
//     .container {
//       max-width: 600px;
//       margin: auto;
//       background: white;
//       padding: 30px;
//       border-radius: 10px;
//       box-shadow: 0 0 10px rgba(0,0,0,0.1);
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//       border-bottom: 2px solid #eee;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 28px;
//       color: #333;
//     }
//     .section {
//       margin: 20px 0;
//     }
//     .label {
//       font-weight: bold;
//       color: #555;
//     }
//     .value {
//       margin-left: 10px;
//       color: #222;
//     }
//     .footer {
//       text-align: center;
//       font-size: 12px;
//       color: #aaa;
//       margin-top: 30px;
//       border-top: 1px solid #eee;
//       padding-top: 15px;
//     }
//   </style>
// </head>
// <body>
// <div class="section">
//   <span class="label">Room ID:</span><span class="value">${
//     roomId || "N/A"
//   }</span>
// </div>
// <div class="section">
//   <span class="label">Payment Status:</span><span class="value">${
//     status || "N/A"
//   }</span>
// </div>
//   <div class="container">
//     <div class="header">
//       <h1>Payment Receipt</h1>
//     </div>
//     <div class="section">
//       <span class="label">Name:</span><span class="value">${name}</span>
//     </div>
//     <div class="section">
//       <span class="label">Amount Paid:</span><span class="value">Rs.${amount.toFixed(
//         2
//       )}</span>
//     </div>
//     <div class="section">
//       <span class="label">Date:</span><span class="value">${newDate}</span>
//     </div>
//     <div class="footer">
//       Thank you for your payment!<br />
//      Room Finder &copy; ${new Date().getFullYear()}
//     </div>
//   </div>
// </body>
// </html>`;

module.exports = receiptTemplate;
