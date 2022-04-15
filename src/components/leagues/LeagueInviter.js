import React from "react";

function LeagueInviter({ league }) {
  const copyInvitationLink = () => {
    navigator.clipboard.writeText(league.inviteKey);
  };

  return (
    <button type="button" onClick={copyInvitationLink}>
      Copy Invitation Link
    </button>
  );
}

export default LeagueInviter;
