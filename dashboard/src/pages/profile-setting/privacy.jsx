import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const PolicyComponent = () => {
  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            Privacy Policies
          </Typography>

          <Typography variant="h4" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Netbots. This website is owned and operated by Netbots. These terms and conditions, along with our Privacy Policy, govern your use of our website and services. By accessing and using this website, you agree to comply with and be bound by the following terms.
          </Typography>

          <Typography variant="h4" gutterBottom>
            2. Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We collect personal information such as name, email, and payment details to process orders. We use cookies to enhance user experience. Your data is shared with trusted third parties for order fulfillment and support. You have the right to access, update, or delete your data. For more details, refer to our <a href="/privacy-policy">Privacy Policy</a>.
          </Typography>

          <Typography variant="h4" gutterBottom>
            3. User Account
          </Typography>
          <Typography variant="body1" paragraph>
            By creating an account, you are responsible for maintaining the confidentiality of your account and password. You agree to:

            Provide accurate information.
            Update any changes in contact information or payment details.
            Be responsible for any activity under your account.
          </Typography>

          <Typography variant="h4" gutterBottom>
            4. Orders & Payments
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Order Confirmation:</strong> You’ll receive an email after placing an order. We reserve the right to cancel orders due to pricing errors or stock issues.
            <br />
            <strong>Payments:</strong> We accept major payment methods securely.
            <br />
            <strong>Pricing & Availability:</strong> Subject to change without notice. Shipping fees will be calculated at checkout.
          </Typography>

          <Typography variant="h4" gutterBottom>
            5. Shipping Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Shipping Time: Orders are typically processed within [X] business days and shipped via our trusted courier partners. Estimated delivery times will be displayed during checkout.
            Shipping Costs: Shipping costs are calculated based on the destination and package weight. You will be able to view these costs before placing your order.
            International Shipping: We offer international shipping to selected countries. Please note that customs duties and import taxes may apply, and these are the responsibility of the customer.
          </Typography>

          <Typography variant="h4" gutterBottom>
            6. Returns & Refunds
          </Typography>
          <Typography variant="body1" paragraph>
            Return Period: Items can be returned within [30] days of delivery for a full refund or exchange.
            Eligibility: Items must be in their original condition with all tags and packaging intact. Certain products, such as perishable goods or personalized items, may not be eligible for return.
            Return Process: To initiate a return, contact customer support, and they will guide you through the process. Refunds will be issued to the original payment method once the return is received and processed.
            Restocking Fee: A restocking fee of 10% may apply to certain returns.
          </Typography>

          <Typography variant="h4" gutterBottom>
            7. Customer Support
          </Typography>
          <Typography variant="body1" paragraph>
            For questions or assistance, please contact our customer support team via:

            Email: netbots@gmail.com
            Phone: +92300000000000
          </Typography>

          <Typography variant="h4" gutterBottom>
            8. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content on this website, including images, text, logos, and designs, is owned by Netbots or its content suppliers. Unauthorized use of this material is prohibited. Unauthorized use is prohibited.
          </Typography>

          <Typography variant="h4" gutterBottom>
            9. Prohibited Activities
          </Typography>
          <Typography variant="body1" paragraph>
            Users agree not to engage in the following prohibited activities:

            Using the site for illegal purposes.
            Attempting to hack or disrupt the website's functionality.
            Posting false or misleading information, including fake reviews.
            Impersonating other users or third parties.
          </Typography>

          <Typography variant="h4" gutterBottom>
            10. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We make every effort to ensure accurate product descriptions and availability; however, we do not guarantee that product descriptions, prices, or other content is error-free. Our liability is limited to the maximum extent permitted by law, and we are not responsible for any indirect, incidental, or consequential damages arising from the use of our website or services.
          </Typography>

          <Typography variant="h4" gutterBottom>
            11. Changes to the Terms and Policies
          </Typography>
          <Typography variant="body1" paragraph>
            We may update these terms from time to time to reflect changes in our business practices or legal requirements. You are encouraged to review this page regularly. Continued use of the website after changes are made constitutes acceptance of the updated terms.
          </Typography>

          <Typography variant="h4" gutterBottom>
            12. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These terms are governed by the laws of Pakistan. Any disputes will be resolved in Supreme Court of Pakistan.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PolicyComponent;
