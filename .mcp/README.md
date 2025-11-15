# MCP (Model Context Protocol) Configuration Guide

## Overview
This project is configured to work with MCP servers for enhanced AI agent capabilities, including GitHub and Jira integrations. Both services use **browser-based OAuth authentication** - no manual token management required!

## Setup Instructions

### 1. GitHub MCP Server

The GitHub MCP server enables AI agents to interact with GitHub repositories, issues, pull requests, and more.

**Steps:**
1. Copy the MCP configuration (see installation section below)
2. Start Claude Desktop
3. On first use, you'll be prompted to authenticate via browser
4. Log in to GitHub when prompted
5. Authorize the MCP application
6. Done! The authentication will be saved automatically

**Available Operations:**
- Create and manage issues
- Create and review pull requests
- Search repositories and code
- Manage branches
- Access repository files
- Review commit history

### 2. Jira MCP Server

The Jira MCP server enables AI agents to interact with Jira for issue tracking and project management.

**Steps:**
1. Update `JIRA_URL` in `mcp-config.json` with your Jira domain:
   ```json
   {
     "env": {
       "JIRA_URL": "https://your-company.atlassian.net"
     }
   }
   ```
2. Start Claude Desktop
3. On first use, you'll be prompted to authenticate via browser
4. Log in to Jira when prompted
5. Authorize the MCP application
6. Done! The authentication will be saved automatically

**Available Operations:**
- Create and update issues
- Search issues (JQL queries)
- Manage issue transitions
- Add comments
- Assign issues
- Manage sprints
- Access project information

## Using MCP with Claude Desktop

### Installation

1. **Install Claude Desktop** (if not already installed)
2. **Ensure Node.js is installed** (for npx commands): `node --version`
3. **Copy the MCP configuration:**

**macOS/Linux:**
```bash
mkdir -p ~/Library/Application\ Support/Claude/
cp .mcp/mcp-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
mkdir "%APPDATA%\Claude"
copy .mcp\mcp-config.json "%APPDATA%\Claude\claude_desktop_config.json"
```

4. **Update Jira URL** (if using Jira):
   - Edit the config file and replace `https://your-domain.atlassian.net` with your actual Jira URL
5. **Restart Claude Desktop**

### First Time Authentication

When you first use an MCP server:

1. **Claude will prompt you to authenticate**
   - A browser window will open automatically
   
2. **For GitHub:**
   - Log in to your GitHub account
   - Review the permissions requested
   - Click "Authorize" to grant access
   
3. **For Jira:**
   - Log in to your Jira account
   - Review the permissions requested
   - Click "Authorize" to grant access

4. **Authentication tokens are saved automatically**
   - You won't need to authenticate again unless you revoke access
   - Tokens are stored securely by the MCP server

### Verification

After configuration, Claude Desktop will have access to:
- ✅ GitHub repository operations (after browser authentication)
- ✅ Jira issue management (after browser authentication)
- ✅ No manual token management required
- ✅ Secure OAuth-based authentication

## AI Agent Capabilities with MCP

With MCP configured, AI agents can:

### GitHub Integration
```
Example prompts:
- "Create a new issue in this repository about adding authentication"
- "Review the last 5 pull requests"
- "Show me recent commits on the master branch"
- "Create a pull request for the feature branch"
- "Search for TODO comments in the codebase"
```

### Jira Integration
```
Example prompts:
- "Create a new task in Jira for implementing the user management page"
- "Show me all open issues assigned to me"
- "Update issue PROJ-123 status to In Progress"
- "Find all bugs in the current sprint"
- "Add a comment to issue PROJ-456 with the solution"
```

### Combined Workflows
```
Example prompts:
- "Create a Jira ticket and a corresponding GitHub issue for adding email notifications"
- "Update the Jira issue when I push code to GitHub"
- "List all GitHub PRs that are linked to open Jira tickets"
```

## Security Best Practices

1. **OAuth tokens are managed automatically**
   - No need to manually copy/paste tokens
   - Tokens are stored securely by the MCP server
   - Authentication happens via browser (OAuth flow)

2. **Revoke access if needed**
   - **GitHub**: Go to Settings → Applications → Authorized OAuth Apps
   - **Jira**: Go to Account Settings → Connected Apps
   - Click "Revoke" to remove access

3. **Review permissions regularly**
   - Check what access each MCP server has
   - Revoke and re-authenticate if you want to change permissions

4. **The config file is safe to commit**
   - No sensitive tokens in `mcp-config.json`
   - Only contains service URLs and setup instructions
   - OAuth tokens are stored separately by the MCP system

## Troubleshooting

### MCP Server Not Loading
- Check that Node.js is installed: `node --version`
- Verify npx is available: `npx --version`
- Check Claude Desktop logs for errors
- Restart Claude Desktop after configuration changes

### Authentication Not Working
- **Browser doesn't open**: 
  - Check your default browser is set correctly
  - Try manually opening the authentication URL from error message
  
- **Authentication fails**:
  - Make sure you're logged in to GitHub/Jira in your browser
  - Clear browser cookies and try again
  - Check that pop-ups are not blocked
  
- **"Already authenticated but not working"**:
  - Revoke access from GitHub/Jira settings
  - Restart Claude Desktop
  - Re-authenticate when prompted

### Jira Connection Issues
- Verify Jira URL is correct in `mcp-config.json`
- Ensure URL includes `https://`
- Check that your Jira instance is accessible
- Make sure you have permission to access the Jira projects

## Advanced Configuration

### Adding Additional MCP Servers

You can extend the configuration with more MCP servers:

```json
{
  "mcpServers": {
    "github": { ... },
    "jira": { ... },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "description": "File system operations"
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      },
      "description": "PostgreSQL database operations"
    }
  }
}
```

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP GitHub Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [MCP Jira Server](https://github.com/modelcontextprotocol/servers/tree/main/src/jira)
- [Claude Desktop Configuration](https://docs.anthropic.com/claude/docs/model-context-protocol)

## Support

For issues with:
- **MCP Configuration**: Check the MCP documentation
- **GitHub Integration**: Verify GitHub token permissions
- **Jira Integration**: Check Jira API token and permissions
- **Project-specific questions**: See the main README.md
