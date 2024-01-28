import { capitalCase } from "change-case"
import { Link as RouterLink } from "react-router-dom"
// @mui
import { styled } from "@mui/material/styles"
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Tooltip,
  Alert,
} from "@mui/material"
// hooks
import useAuth from "../../hooks/useAuth"
import useResponsive from "../../hooks/useResponsive"
// routes
// import { PATH_AUTH } from "../../routes/paths"
// components
import Page from "../../components/Page"
import Logo from "../../components/Logo"
import Image from "../../components/Image"
// sections
import { RegisterForm } from "../../sections/auth/register"

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}))

const HeaderStyle = styled("header")(({ theme }) => ({
  //   backgroundColor: "blue",
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  //   backgroundColor: "green",
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled("div")(({ theme }) => ({
  //   backgroundColor: "grey",
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth()

  const smUp = useResponsive("up", "sm")

  const mdUp = useResponsive("up", "md")

  return (
    <Page title="Register">
      <RootStyle>
        {/* header */}
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?
              <Link variant="subtitle2" component={RouterLink} to="/auth/login">
                {" "}
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {/* left section */}
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Manage the Task........
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src="/assets/illustrations/pngtree-female.png"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4">Get started</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever
                </Typography>
              </Box>
              <Tooltip title={capitalCase(method)}>
                <>
                  <Image
                    disabledEffect
                    src={`https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_${method}.png`}
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip>
            </Box>

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree....
              <Link underline="always" color="text.secondary" href="#">
                Terms of service
              </Link>{" "}
              and <Link>Privacy Policy</Link>.
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have and account?{" "}
                <Link
                  variant="subtitle2"
                  to="/auth/login"
                  component={RouterLink}
                >
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}
