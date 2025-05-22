import { useEffect, useState } from "react";
import apiClient from "../api/utils";
import "./campaign.css";
import donation from "../assets/donation.png";
import { IoMdTime } from "react-icons/io";
import SelectedCampaign from "./selected-campaign";
import Loader from "../components/loader";

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const fetchCampaigns = async (pageNum) => {
    try {
      setLoading(true);
      console.log(`Fetching campaigns page ${pageNum}`);
      const response = await apiClient.get(
        `/campaign/all?page=${pageNum}&limit=6`
      );
      console.log("Campaigns response:", response.data);

      if (response.data?.data?.campaigns) {
        const newCampaigns = response.data.data.campaigns.filter(
          (c) => !c.isTrashed
        );

        const {
          page: currentPage,
          total,
          limit,
        } = response.data.data.meta || {};
        setHasMore(currentPage * limit < total);

        setCampaigns((prev) =>
          pageNum === 1 ? newCampaigns : [...prev, ...newCampaigns]
        );
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(1);
  }, []);

  const loadMoreCampaigns = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCampaigns(nextPage);
  };

  const formatCurrency = (amount, currency = "NGN") =>
    currency === "NGN"
      ? `₦${amount.toLocaleString()}`
      : `${currency} ${amount.toLocaleString()}`;

  const handleCampaignSelect = (id) => {
    console.log("Selected campaign ID:", id);
    setSelectedCampaignId(id);
  };

  if (selectedCampaignId) {
    return (
      <SelectedCampaign
        campaign={selectedCampaignId}
        onBack={() => setSelectedCampaignId(null)}
      />
    );
  }

  return (
    <div className="campaigns-container" id="home">
      <div className="campaigns-header">
        <h1>Campaigns</h1>
        <div className="sort-dropdown">
          <span>Sort by: </span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
          </select>
        </div>
      </div>

      <div className="campaigns-grid">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="campaign-card"
            onClick={() => handleCampaignSelect(campaign.id)}
          >
            <div className="campaign-image">
              <img
                src={campaign.coverImage || donation}
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = donation;
                }}
              />
            </div>

            <div className="campaign-category">
              {campaign.category || (
                <span className="invisible">Placeholder</span>
              )}
            </div>

            <h3 className="campaign-title">
              {campaign.title || <span className="invisible">No Title</span>}
            </h3>

            <p className="campaign-description">
              {campaign.description ? (
                campaign.description.length > 100 ? (
                  `${campaign.description.substring(0, 100)}...`
                ) : (
                  campaign.description
                )
              ) : (
                <span className="invisible">No description</span>
              )}
            </p>

            <div className="campaign-progress">
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

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${campaign.meta.percentageContributions}%`,
                }}
              />
            </div>

            <div className="campaign-footer">
              <div className="campaign-date">
                <IoMdTime color="#39BD78" size={20} />
                <span style={{ color: "#12152899" }}>*** days left</span>
              </div>
              <span style={{ color: "#71737E" }}>
                {campaign.numbersOfContributions || 0} Contributed
              </span>
            </div>
          </div>
        ))}

        {campaigns.length === 0 && !loading && (
          <div className="no-campaigns">
            <p>No campaigns found</p>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button
            className="load-more-button"
            onClick={loadMoreCampaigns}
            disabled={loading}
          >
            {loading ? <Loader /> : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
