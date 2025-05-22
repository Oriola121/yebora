import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import "./selected-campaign.css";
import { IoMdTime } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { useEffect, useState } from "react";
import apiClient from "../api/utils";
import Loader from "../components/loader";
import donation from "../assets/donation.png";
import Donation from "./donation";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import house from "../assets/house.svg";
import user from "../assets/user.png";
import { AiOutlineLink } from "react-icons/ai";
import ContributionsTab from "./contribution-tabs";

export default function SelectedCampaign({ campaign: campaignId, onBack }) {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donate, setDonate] = useState(false);

  const handleDonate = () => {
    setDonate(!donate);
  };

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching campaign details for ID:", campaignId);
        const res = await apiClient.get(`/campaign/detail/${campaignId}`);
        console.log("Campaign details response:", res.data);
        setCampaign(res.data.data.campaign);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch campaign details:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load campaign"
        );
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaignDetails();
    }
  }, [campaignId]);

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const formatCurrency = (amount, currency = "NGN") =>
    currency === "NGN"
      ? `₦${amount?.toLocaleString() || "0"}`
      : `${currency} ${amount?.toLocaleString() || "0"}`;

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabItems = [
    {
      label: "About Campaign",
      value: "1",
      content: <p>{campaign?.description}</p>,
    },
    {
      label: "Contributions",
      value: "2",
      content: <ContributionsTab campaignId={campaignId} />,
    },
    {
      label: "Notice Board",
      value: "3",
      content: <p>No notices yet.</p>,
    },
    {
      label: "Document",
      value: "4",
      content: <p>No documents uploaded.</p>,
    },
  ];

  return (
    <div className="selected-campaign" id="campaign">
      <header
        style={{
          height: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 50px",
        }}
      >
        <button className="back-button" onClick={onBack}>
          <PiCaretLeft color="#4E5D78" size={14} />
          <h3 style={{ color: "#13192E" }}>All Campaigns</h3>
        </button>

        <ul className="selected-nav">
          <li className="nav-link inactive">Home</li>
          <PiCaretRight color="#777E90" />
          <li className="nav-link active">Campaign</li>
        </ul>
      </header>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : error ? (
        <div className="error-state">
          <h3>Error loading campaign</h3>
          <p>{error}</p>
          <button className="back-button" onClick={onBack}>
            Go back to campaigns
          </button>
        </div>
      ) : !campaign ? (
        <div className="not-found">
          <h3>Campaign not found</h3>
          <button className="back-button" onClick={onBack}>
            Go back to campaigns
          </button>
        </div>
      ) : (
        <div className="selected-inner">
          <div className="selected-section">
            <div className="selected-image">
              <img
                src={campaign.coverImage || donation}
                alt="campaign cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "donation";
                }}
              />
            </div>
            <div className="selected-details">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li className="selected-category">
                  {campaign.category || "General"}
                </li>
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: " #DADBDC",
                  }}
                />
                <li className="selected-date">
                  <IoMdTime color="#39BD78" size={20} />
                  <span style={{ color: "#12152899" }}>
                    Duration:{" "}
                    {calculateDuration(campaign.startDate, campaign.endDate)}{" "}
                    days
                  </span>
                </li>
              </ul>
              <h3>{campaign.title}</h3>

              <div style={{ marginLeft: 0 }} className="campaign-progress">
                <div className="campaign-amount">
                  <strong>
                    {formatCurrency(
                      campaign.totalContributions || 0,
                      campaign.currency
                    )}
                  </strong>{" "}
                  Raised
                </div>
                <div className="campaign-percentage">
                  {campaign.meta?.percentageContributions
                    ? `${campaign.meta.percentageContributions}%`
                    : "0%"}
                </div>
              </div>

              <div style={{ marginLeft: 0 }} className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${campaign.meta?.percentageContributions}%`,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "-25px",
                  padding: 0,
                }}
              >
                <p style={{ color: "#2A2A2A", fontSize: "14px" }}>
                  {toSentenceCase(campaign.contributionType)} payment
                </p>
                <p style={{ color: "#2A2A2A", fontSize: "14px" }}>
                  {campaign.meta.daysLeft} days left
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button className="donate-btn" onClick={handleDonate}>
                  Donate
                </button>
                <button className="pledge-btn">Pledge</button>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", border: "1px solid #BCCBE5" }} />

          <div className="selected-section2">
            <div style={{ width: "60%" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="Campaign Tabs"
                    textColor="inherit"
                    TabIndicatorProps={{
                      style: { backgroundColor: "#328BE0" },
                    }}
                  >
                    {tabItems.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    ))}
                  </TabList>
                </Box>

                {tabItems.map((tab) => (
                  <TabPanel key={tab.value} value={tab.value}>
                    {tab.content}
                  </TabPanel>
                ))}
              </TabContext>
            </div>

            <div className="creator">
              <div className="creator-details">
                <div className="creator-head">
                  <p
                    style={{
                      color: "#2A2A2A",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    ACCOUNT DETAILS
                  </p>
                  <p style={{ color: "#828282", fontSize: "12px" }}>
                    People can contribute directly to this goal via transfer.
                  </p>
                </div>
                <div className="creator-content">
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "50%",
                      background: "#F1FAF5",
                    }}
                  >
                    <img src={house} alt="" />
                  </div>
                  <div>
                    <p className="creator-text">
                      {campaign?.bankAccount?.bankAccountName ||
                        "LAPTOP FUNDS LTD"}
                    </p>
                    <span
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                        color: "#363641",
                        fontWeight: "bold",
                      }}
                    >
                      <p>
                        {campaign?.bankAccount?.bankAccountNumber ||
                          "3094827647"}
                      </p>
                      <AiOutlineLink color="#328BE0" size={18} />
                    </span>
                    <p className="creator-text">
                      {campaign?.bankAccount?.bankName ||
                        "FIRSTBANK OF NIGERIA PLC"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="creator-details">
                <div className="creator-head">
                  <p
                    style={{
                      color: "#2A2A2A",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    CREATOR
                  </p>
                </div>
                <div className="creator-content">
                  <img
                    src={user}
                    alt=""
                    style={{
                      borderRadius: "50%",
                    }}
                  />

                  <div className="text-second">
                    <span
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                        color: "#2a2a2a",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      <p>
                        {campaign?.user?.company ||
                          "CRUSTSOCKS PRODUCTIONS LLC"}
                      </p>
                      <MdVerified color="#328BE0" size={16} />
                    </span>

                    <p
                      style={{
                        color: "#8D8D8D",
                        fontSize: "14px",
                        marginTop: "-10px",
                      }}
                    >
                      Created{" "}
                      {calculateDuration(campaign.startDate, campaign.endDate)}{" "}
                      days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {donate && <Donation onClose={handleDonate} campaign={campaign} />}
    </div>
  );
}
