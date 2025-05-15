import { Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const emphasizedText = {
  fontWeight: "bold" as const,
  color: "#333",
};

const linkStyle = {
  padding: "10px 20px",
  backgroundColor: "#4a86e8",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "4px",
  display: "inline-block",
  margin: "15px 0",
  fontWeight: "bold" as const,
};

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "ol-learn", // Currently active theme for preview
};

// Define available themes for reference
export const availableThemes = ["ol-learn", "ol-data-platform"];

// Helper function to switch themes during development
export const getPreviewPropsForTheme = (theme: string): TemplateProps => ({
  locale: "en",
  themeName: theme,
});

export const templateName = "Org Invite";

const { exp } = createVariablesHelper("org-invite.ftl");


export const Template = ({ locale, themeName }: TemplateProps) => {
  // Choose the appropriate message based on theme name
  if (themeName === "ol-learn") {
    return (
      <EmailLayout preview={`Invitation to join MIT Learn`} locale={locale}>
        <Text style={paragraph}>
          <p>
            Hi,
          </p>

          <p>
            You have been invited to join <span style={emphasizedText}>MIT Learn</span>. 
            This platform provides access to MIT Learn's educational resources and course materials.
          </p>
          
          <p>
            As a member of MIT Learn, you'll be able to access courses, tutorials, and learning 
            materials designed to enhance your educational experience.
          </p>
          
          <p>
            To accept this invitation and set up your account, please click the button below:
          </p>
          
          <p style={{ textAlign: "center" as const, margin: "25px 0" }}>
            <a href={exp("link")} style={linkStyle}>Join MIT Learn</a>
          </p>
          
          <p>
            <strong>Important:</strong> This invitation link will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
          </p>
          
          <p>
            If you did not expect this invitation or have any questions, please contact the MIT Learn support team.
          </p>
          
          <p style={{ marginTop: "30px", fontSize: "14px", color: "#777" }}>
            If you're unable to click the button above, copy and paste the following URL into your browser:
            <br />
            <span style={{ wordBreak: "break-all" as const }}>{exp("link")}</span>
          </p>
          
          <p style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", fontSize: "14px", color: "#999" }}>
            This is an automated message from MIT Learn. Please do not reply to this email.
          </p>
        </Text>
      </EmailLayout>
    );
  } else if (themeName === "ol-data-platform") {
    return (
      <EmailLayout preview={`Invitation to MIT Open Learning Data Platform`} locale={locale}>
        <Text style={paragraph}>
          <p>
            Hi,
          </p>

          <p>
            You have been invited to join <span style={emphasizedText}>MIT Open Learning Data Platform</span>. 
            This platform provides tools for data analysis and insights into learning patterns across MIT's courses.
          </p>
          
          <p>
            As a data platform user, you'll have access to analytics dashboards, research datasets, 
            and collaboration tools designed for educational data science.
          </p>
          
          <p>
            To accept this invitation and begin working with the platform, please click the button below:
          </p>
          
          <p style={{ textAlign: "center" as const, margin: "25px 0" }}>
            <a href={exp("link")} style={linkStyle}>Access Data Platform</a>
          </p>
          
          <p>
            <strong>Important:</strong> This invitation link will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
          </p>
          
          <p>
            If you have questions about data usage policies or technical requirements, please contact the 
            platform administration team.
          </p>
          
          <p style={{ marginTop: "30px", fontSize: "14px", color: "#777" }}>
            If you're unable to click the button above, copy and paste the following URL into your browser:
            <br />
            <span style={{ wordBreak: "break-all" as const }}>{exp("link")}</span>
          </p>
          
          <p style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", fontSize: "14px", color: "#999" }}>
            This is an automated message from MIT Open Learning Data Platform. Please do not reply to this email.
          </p>
        </Text>
      </EmailLayout>
    );
  }
};

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Invitation to join {0} - Action Required";
};