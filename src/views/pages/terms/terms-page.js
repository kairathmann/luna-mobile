import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Answers } from 'react-native-fabric'

export class TermsPage extends React.Component {
	componentDidMount() {
		Answers.logContentView('Manage Profile Page')
	}

	render() {
		return (
			<ScrollView>
				<Text style={styles.headerText}>Terms of Service</Text>
				<Text style={styles.normalText}>
					Published: 31.01.2018. Last updated: 03.02.2018
				</Text>
				<Text style={styles.headerText}>Luna Welcomes You!</Text>
				<Text style={styles.normalText}>
					Thank you for using our products and services (“Services”). These are
					the Terms and Conditions of Use (&quot;Terms&quot;) that apply between
					you and Gravity Analytics Limited, referred to as
					&quot;meetluna.com&quot; or &quot;we&quot; or “us” or “our”. You can
					accept these Terms by: (1) clicking to accept or agree to the Terms
					where this option is made available to you by meetluna.com for any
					Service; or (2) actually using the Services. Please read the Terms
					carefully -- if you do not agree to these Terms, do not access or use
					the Services. If you use our Services on behalf of an organization,
					you agree to these Terms on behalf of your organization and represent
					that you have the authority to do so.Some of our Services may require
					additional terms or product requirements (e.g. being minimum 18 years
					old). We will make additional terms available with the relevant
					Services, and those additional terms will become part of your
					agreement with us if you use those Services.We may modify these Terms
					at any time and in our sole discretion. meetluna.com will provide
					notice of changes to the Terms by displaying notices or links to
					notices through the Services (for example, on this page). Your
					continued use of the Services will confirm your acceptance of the
					revised Terms. If you do not agree to the modified Terms, you should
					discontinue your use of the Services. Please look at the Terms
					regularly. In these Terms, the the words “including” and “include”
					mean “including, but not limited to.”Note that these Terms contain a
					mandatory arbitration provision that requires the use of arbitration
					on an individual basis and limits the remedies available to you in the
					event of certain disputes. Please review the arbitration agreement
					carefully. By accepting these Terms, you expressly acknowledge that
					you have read and understand the arbitration agreement.
				</Text>
				<Text style={styles.headerText}>Arbitration Agreement</Text>
				<Text style={styles.normalText}>
					PLEASE READ THE FOLLOWING SECTION CAREFULLY BECAUSE IT REQUIRES YOU TO
					ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH MEETLUNA.COM AND LIMITS THE
					MANNER IN WHICH YOU CAN SEEK RELIEF FROM US.
				</Text>
				<Text style={styles.indentedHeaderText}>Binding Arbitration</Text>
				<Text style={styles.indentedNormalText}>
					Except for any disputes, claims, suits, actions, causes of action,
					demands or proceedings (collectively, “Disputes”) in which either
					party seeks to bring an individual action in small claims court or
					seeks injunctive or other equitable relief for the alleged unlawful
					use of intellectual property, including, without limitation,
					copyrights, trademarks, trade names, logos, trade secrets or patents,
					you and meetluna.com agree: (a) to waive your and meetluna.com’s
					respective rights to have any and all Disputes arising from or related
					to these Terms, the Services, or the Content resolved in a court; and
					(b) to waive your and meetluna.com’s respective rights to a jury
					trial. Instead, you and meetluna.com agree to arbitrate Disputes
					through binding arbitration (which is the referral of a Dispute to one
					or more persons charged with reviewing the Dispute and making a final
					and binding determination to resolve it instead of having the Dispute
					decided by a judge or jury in court).
				</Text>
				<Text style={styles.indentedHeaderText}>
					No Class Arbitrations, Class Actions or Representative Actions
				</Text>
				<Text style={styles.indentedNormalText}>
					You and meetluna.com agree that any Dispute arising out of or related
					to these Terms, the Services, or the Content is personal to you and
					meetluna.com and that such Dispute will be resolved solely through
					individual arbitration and will not be brought as a class arbitration,
					class action or any other type of representative proceeding. You and
					meetluna.com agree that there will be no class arbitration or
					arbitration in which an individual attempts to resolve a Dispute as a
					representative of another individual or group of individuals. Further,
					you and meetluna.com agree that a Dispute cannot be brought as a class
					or other type of representative action, whether within or outside of
					arbitration, or on behalf of any other individual or group of
					individuals.
				</Text>
				<Text style={styles.indentedHeaderText}>
					Notice: Informal Dispute Resolution
				</Text>
				<Text style={styles.indentedNormalText}>
					You and meetluna.com agree that each party will notify the other party
					in writing of any arbitrable or small claims Dispute within 30 days of
					the date it arises, so that the parties can attempt in good faith to
					resolve the Dispute informally. Notice to meetluna.com shall be sent{' '}
					<Text style={styles.normalText}>support@meetluna.com</Text>. Your
					notice must include: (a) your name, postal address, telephone number,
					the email address you use or used for your meetluna.com registration
					and, if different, an email address at which you can be contacted; (b)
					a description in reasonable detail of the nature or basis of the
					Dispute; and (c) the specific relief that you are seeking. Our notice
					to you will be sent electronically in accordance with these Terms and
					will include: (x) our name, postal address, telephone number and an
					email address at which we can be contacted with respect to the
					Dispute; (y) a description in reasonable detail of the nature or basis
					of the Dispute; and (z) the specific relief that we are seeking. If
					you and meetluna.com cannot agree how to resolve the Dispute within 30
					days after the date notice is received by the applicable party, then
					either you or meetluna.com may, as appropriate and in accordance with
					this arbitration agreement, commence an arbitration proceeding or, to
					the extent specifically provided for above, file a claim in court.
				</Text>
				<Text style={styles.indentedHeaderText}>Process</Text>
				<Text style={styles.indentedNormalText}>
					Except for Disputes in which either party seeks to bring an individual
					action in small claims court or seeks injunctive or other equitable
					relief for the alleged unlawful use of intellectual property,
					including, without limitation, copyrights, trademarks, trade names,
					logos, trade secrets or patents, you and meetluna.com agree that any
					Dispute must be commenced or filed by you or meetluna.com within one
					(1) year of the date the Dispute arose, otherwise the underlying claim
					is permanently barred (which means that you and meetluna.com will no
					longer have the right to assert such claim regarding the Dispute). You
					and meetluna.com agree that: (a) any arbitration will occur in London,
					United Kingdom; (b) arbitration will be conducted confidentially by a
					single arbitrator in accordance with the The London Court of
					International Arbitration (LCIA) rules; and (c) that the state or
					courts of the United Kingdom, respectively, sitting in London, have
					exclusive jurisdiction over any appeals and the enforcement of an
					arbitration award.
				</Text>
				<Text style={styles.indentedHeaderText}>Authority of Arbitrator</Text>
				<Text style={styles.indentedNormalText}>
					As limited by these Terms and the applicable rules, the arbitrator
					will have: (a) the exclusive authority and jurisdiction to make all
					procedural and substantive decisions regarding a Dispute, including
					the determination of whether a Dispute is arbitrable; and (b) the
					authority to grant any remedy that would otherwise be available in
					court; provided, however, that the arbitrator does not have the
					authority to conduct a class arbitration or a representative action,
					which is prohibited by these Terms. The arbitrator may only conduct an
					individual arbitration and may not consolidate more than one
					individual’s claims, preside over any type of class or representative
					proceeding or preside over any proceeding involving more than one
					individual.
				</Text>
				<Text style={styles.indentedHeaderText}>Severability</Text>
				<Text style={styles.indentedNormalText}>
					If any term, clause or provision of this arbitration agreement is held
					invalid or unenforceable, it will be so held to the minimum extent
					required by law, and all other terms, clauses and provisions of this
					arbitration agreement will remain valid and enforceable. Further, the
					waivers set forth in this arbitration agreement are severable from the
					other provisions of these Terms and will remain valid and enforceable,
					except as prohibited by applicable law.
				</Text>
				<Text style={styles.indentedHeaderText}>Opt-Out Right</Text>
				<Text style={styles.indentedNormalText}>
					You have the right to opt out of binding arbitration within thirty
					(30) days of the date you first accepted the terms of this Dispute
					Resolution section by writing to:{' '}
					<Text style={styles.normalText}>support@meetluna.com</Text>. In order
					to be effective, the opt-out notice must include your full name and
					clearly indicate your intent to opt out of binding arbitration. By
					opting out of binding arbitration, you are agreeing to resolve
					Disputes in accordance with the provisions regarding governing law and
					venue below.
				</Text>
				<Text style={styles.headerText}>Using Our Services</Text>
				<Text style={styles.normalText}>
					We provide a variety of different Services, which include creating a
					user account on the platform, searching for other users on the
					platform, viewing their profile, sending messages, buying LSTR tokens,
					spending LSTR tokens and earning LSTR tokens.When you use our
					Services, you may provide content to us or third parties may submit
					content to you through the Services (“Content”). The Content you
					provide or submit to us is owned by you. These Terms do not give us
					any rights to your Content except for the limited rights set forth in
					these Terms.The schedules attached to these Terms (each a “Schedule”)
					are a part of these Terms. However, a Schedule will only apply to you
					if you engage in the activity or use our Services to which the
					Schedule applies.
				</Text>
				<Text style={styles.indentedHeaderText}>Adult users only</Text>
				<Text style={styles.indentedNormalText}>
					This Website is not intended for children under 18 years of age. If
					you are under 18, you are not authorized to use this Website and will
					not be afforded access to any features of this Website that allow for
					you to provide information to us or to share information with other
					users of this Website.
				</Text>
				<Text style={styles.indentedHeaderText}>
					Prior to using our Services, you acknowledge and agree that:
				</Text>
				<Text style={styles.indentedNormalText}>
					- QTUM and LSTR - like Bitcoin - are dynamic digital currencies, and
					there may be risk of loss when trading, holding, and transacting with.
					Meetluna.com is not an exchange that provides services for trading,
					holding, or investing.
				</Text>
				<Text style={styles.indentedNormalText}>
					- Meetluna.com has no control over, or any liability for, any Content
					that you may buy from, or sell to, third parties via peer-to-peer
					transactions. If you encounter an issue with a transaction with a
					third party, please notify meetluna.com at{' '}
					<Text style={styles.normalText}>support@meetluna.com</Text>, including
					if you suspect a third party has behaved in violation of these Terms.
				</Text>
				<Text style={styles.indentedNormalText}>
					- Meetluna.com is not responsible for any loss of your digital
					currency due to mishandling, theft, or any other factor outside of
					meetluna.com’s direct control.
				</Text>
				<Text style={styles.indentedNormalText}>
					You may only use our Services as permitted by law. You are responsible
					for all uses of LSTR tokens you may receive from meetluna.com through
					the Services. You are responsible for any taxes due with respect to
					your use of the Services and any payments we make to you. We do not
					intend to create a partnership with you for any tax or other purpose.
				</Text>
				<Text style={styles.indentedNormalText}>
					Unless otherwise indicated, the Services are the property of
					meetluna.com and using the Services does not grant you ownership of
					any intellectual property rights in our Services. These Terms do not
					grant you any right, title or interest in the Services, others’
					content in the Services, or meetluna.com branding or logos used in our
					Services. Do not remove, obscure, or alter any legal notices displayed
					in or along with our Services. We love feedback, but do note that we
					may use any feedback to improve our Services without any additional
					obligation to you.
				</Text>
				<Text style={styles.headerText}>Meetluna.com Services and Tokens</Text>
				<Text style={styles.normalText}>
					In addition, using our Services may reward you with tokens for using
					the Luna app (as those terms are hereinafter defined). When you are
					rewarded with tokens via the Services, this is not a peer-to-peer
					transaction and you are transacting solely with the Company. All uses
					of tokens are not cancellable and not refundable, except as set forth:
					(1) in these Terms; (2) our refund policy obtainable on demand by
					emailing support@meetluna.com, or (3) as required by law.
				</Text>
				<Text style={styles.headerText}>Account Registration</Text>
				<Text style={styles.normalText}>
					You may need a meetluna.com account to use some of our Services. By
					creating an account, you agree to: (1) provide accurate, complete, and
					current information; and (2) protect your account by keeping your
					password confidential.
				</Text>
				<Text style={styles.normalText}>
					You agree that you will not create more than one meetluna.com account
					to access the Services. You are responsible for the activity that
					happens on or through your meetluna.com account. If you learn of any
					unauthorized access to your account, contact support@meetluna.com.
				</Text>
				<Text style={styles.normalText}>
					If you create a meetluna.com account, we may display your name, photo,
					age, gender, location, personal description, sexual orientation and so
					forth in our Services. We will respect the choices you make to limit
					sharing or visibility settings in your meetluna.com account where
					these choices are made available to you. Please note that your public
					profile is by definition &quot;public&quot;, and any profile
					information you choose to display there will be publicly available.
				</Text>
				<Text style={styles.headerText}>Access and proprietary rights</Text>
				<Text style={styles.normalText}>
					By using the Services, you may access Content that is owned by
					Meetluna.com and third parties, the Company has no responsibility or
					liability for your access or use of third-party Content that is made
					available to you through the Services. While we are not obligated to
					review third-party Content, we may remove or refuse to provide access
					to Content that we reasonably believe violates our policies or the
					law. You are allowed to access, use and make a limited number of
					copies of the Content available on this website only for purposes of
					your personal use. Any copies made by you must retain any and all
					copyright notices and other proprietary marks without modification.
					The Services and Content may not be available in all jurisdictions,
					and we may restrict use of all or a portion of the Services and
					Content in certain jurisdictions.
				</Text>
				<Text style={styles.headerText}>Client Software in our Services</Text>
				<Text style={styles.normalText}>
					Some of our Services may allow you to download client software
					(&quot;Client Software&quot;), including the Client Software that
					enables you to interact via the meetluna.com Platform. For these local
					clients, you agree that we may download and install updates to the
					Client Software automatically onto your device once a new version or
					feature is available. Some Services may let you adjust your automatic
					update setting. The Client Software is licensed and not sold to you by
					meetluna.com. Subject to these Terms, we give you a limited,
					nonexclusive, nontransferable, revocable license to use the Client
					Software provided to you by meetluna.com to access the Services. If
					any component of the Client Software is offered under an open source
					license, the provisions of that license may expressly override some of
					these Terms. You may not copy, modify, create derivative works from,
					distribute, sublicense, reverse engineer, decompile, sell, make
					available over any network or lease any part of our Services or the
					included Client Software, unless the foregoing restrictions are
					prohibited by law.
				</Text>
				<Text style={styles.headerText}>Pre-Release Services</Text>
				<Text style={styles.normalText}>
					From time-to-time, we may provide you access to beta or other
					pre-release versions of our Services. We will designate when a Service
					is in beta or pre-release by including the designation “Prototype”, or
					a similar designation, in or near the product description. When a
					Service is in beta or pre-release, the Service is still in development
					and is not ready for general commercial release. Such Service may
					contain bugs, errors and defects, and you should not expect the
					Service to perform in the same way as a fully launched, commercial
					service. You acknowledge that we do not guarantee the full commercial
					introduction of any beta or pre-release Service.
				</Text>
				<Text style={styles.headerText}>Your Responsibilities</Text>
				<Text style={styles.normalText}>
					You are responsible for your conduct and you must comply with these
					Terms. We may review your use and access of the Services for
					compliance with these Terms, though we have no obligation to do so.
					meetluna.com is not responsible for your use of the Services.
				</Text>
				<Text style={styles.headerText}>Commercial use prohibited</Text>
				<Text style={styles.normalText}>
					The Service is for your personal use only and may not be used in
					connection with any commercial endeavors. Organizations, companies,
					and/or businesses may not join and use the Service for any purpose.
					Illegal and/or unauthorized uses of the Service, including collecting
					usernames and/or email addresses by electronic or other means for the
					purpose of sending unsolicited email or using personal identifying
					information for commercial purposes, or unauthorized framing may be
					investigated and appropriate legal action will be taken, including
					without limitation, civil, criminal, and injunctive redress. Use of
					the Service is with our permission, which may be revoked at any time,
					for any reason, in our sole discretion.
				</Text>
				<Text style={styles.headerText}>Privacy</Text>
				<Text style={styles.normalText}>
					Your privacy is very important to us. meetluna.com’s privacy policies
					at meetluna.com/privacy explain how we collect, use, and disclose
					information about you, including information we may collect from any
					device that includes our Software.
				</Text>
				<Text style={styles.headerText}>Copyright Protection</Text>
				<Text style={styles.normalText}>
					We respond to notice of alleged copyright infringement according to
					the process set by the applicable laws of the United Kingdom for the
					requirements of a proper notification. Such notices should be sent to{' '}
					<Text style={styles.normalText}>support@meetluna.com</Text>. We
					reserve the right to delete content alleged to be infringing and
					terminate accounts of infringers without prior notice.
				</Text>
				<Text style={styles.headerText}>Indemnification</Text>
				<Text style={styles.normalText}>
					You agree to indemnify, defend, and hold harmless meetluna.com and its
					affiliates, officers, agents and employees from and against all
					damages, losses, and expenses of any kind (including reasonable legal
					fees and costs) related to: (1) your use of or inability to use the
					Services (including LSTR tokens or the meetluna.com Platform) or
					Content; (2) any Content you provide or offer to provide; (3) any
					peer-to-peer transaction you have with other users; or (4) your
					violation of these Terms. Although we provide these terms for using
					our Services, we cannot control and take no responsibility for users’
					actions and Content.
				</Text>
				<Text style={styles.headerText}>Warranties and Disclaimers</Text>
				<Text style={styles.normalText}>
					We have put in a great deal of effort to deliver you Services that we
					hope you find valuable, but there are certain things we can’t promise
					about them. YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR ACCESS TO
					AND USE OF THE SERVICES AND ANY CONTENT IS AT YOUR SOLE RISK. OTHER
					THAN AS EXPRESSLY SET OUT IN THESE TERMS, NEITHER MEETLUNA.COM NOR ITS
					AFFILIATES, SUPPLIERS OR DISTRIBUTORS (“MEETLUNA.COM PARTIES”) MAKE
					ANY WARRANTY, EITHER EXPRESS OR IMPLIED, ABOUT THE SERVICES OR
					CONTENT. THE SERVICES AND CONTENT ARE PROVIDED “AS IS.” MEETLUNA.COM
					DOES NOT WARRANT THAT: (1) THE OPERATION OF THE SERVICES OR CONTENT
					WILL BE UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE; (2) THE FUNCTIONS
					CONTAINED IN THE SERVICES OR CONTENT WILL BE ACCURATE OR MEET YOUR
					REQUIREMENTS; OR (3) ANY DEFECTS IN THE SERVICES OR CONTENT WILL BE
					CORRECTED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM
					ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
					AND NON-INFRINGEMENT. SOME COUNTRIES OR JURISDICTIONS DO NOT ALLOW THE
					DISCLAIMER OF IMPLIED WARRANTIES, SO SOME DISCLAIMERS IN THIS SECTION
					MAY NOT APPLY TO YOU.
				</Text>
				<Text style={styles.headerText}>Limitation of Liability</Text>
				<Text style={styles.normalText}>
					TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE
					MEETLUNA.COM PARTIES BE RESPONSIBLE TO YOU FOR ANY: (1) LOSS OF USE,
					DATA, BUSINESS OR PROFITS; (2) FINANCIAL LOSSES; OR (3) INDIRECT,
					SPECIAL CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES. THIS WILL BE
					WHETHER OR NOT THE MEETLUNA.COM PARTIES HAVE BEEN WARNED OF THE
					POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL THE AGGREGATE LIABILITY
					OF MEETLUNA.COM PARTIES ARISING OUT OF OR RELATING TO THE USE OF THE
					SERVICES (INCLUDING LSTR TOKENS AND THE MEETLUNA.COM MARKETPLACE) OR
					CONTENT EXCEED THE AMOUNT YOU PAID TO US IN A CENTRALLY CONTROLLED
					GOVERNMENT-ISSUED CURRENCY TO USE OUR SERVICES. NOTWITHSTANDING
					ANYTHING TO THE CONTRARY IN THESE TERMS, NOTHING IN THESE TERMS
					EXCLUDES OR LIMITS LIABILITY FOR FRAUD, FRAUDULENT MISREPRESENTATION,
					OR FOR DEATH OR PERSONAL INJURY CAUSED BY GROSS NEGLIGENCE.
				</Text>
				<Text style={styles.headerText}>Governing Law and Venue</Text>
				<Text style={styles.normalText}>
					These Terms and your access to and use of the Services will be
					governed by the laws of the United Kingdom, without regard to conflict
					of law rules or principles (whether of Ireland or any other
					jurisdiction) that would cause the application of the laws of any
					other jurisdiction. Any Dispute between the parties that is not
					subject to arbitration or cannot be heard in small claims court shall
					be resolved in the courts of the United Kingdom sitting in London,
					United Kingdom.
				</Text>
				<Text style={styles.headerText}>
					Modifications / Termination to Services
				</Text>
				<Text style={styles.normalText}>
					You can stop using our Services at any time (though we hope you
					won’t!). Our Services are constantly being updated, and you should
					revisit these Terms regularly. We reserve the right to suspend or
					terminate users, reclaim meetluna.com account usernames without any
					liability to you, or change, suspend, discontinue or disable access to
					the Services at any time and without notice at our sole discretion. We
					also reserve the right to terminate your access and use of the
					Services if you violate these Terms or any policies referenced herein,
					or if you use the Services in a way that we reasonably believe creates
					legal liability for us.
				</Text>
				<Text style={styles.headerText}>Other Terms</Text>
				<Text style={styles.normalText}>
					If any portion of these Terms is found to be unenforceable, the
					remaining portion will remain in full force and effect. Meetluna.com’s
					failure to enforce a provision of these Terms will not be considered a
					waiver. You may not assign any of your rights under these Terms to
					anyone else, and any such attempt will be void. All of our rights
					under these Terms are freely assignable by us in connection with a
					merger, acquisitions, or sale of assets, or by operation of law or
					otherwise. These Terms control the relationship between yourself and
					meetluna.com. They do not create any third party beneficiary rights.
					We reserve all rights not expressly granted to you.
				</Text>
				<Text style={styles.headerText}>Taxes</Text>
				<Text style={styles.normalText}>
					Users are responsible and required to complete all tax registration
					obligations and calculate all tax liabilities arising from usage of
					the Company’s Services.
				</Text>
				<Text style={styles.headerText}>License Grants</Text>
				<Text style={styles.indentedHeaderText}>Distribution</Text>
				<Text style={styles.indentedNormalText}>
					You hereby grant meetluna.com the non-exclusive, royalty-free right to
					make available and distribute your Content through meetluna.com’s
					Services to end users. Following termination of this Schedule,
					meetluna.com will no longer distribute your Content, but we may retain
					a copy of any Content hosted by meetluna.com for supporting our
					Services, such as to distribute copies to end users who completed
					Tasks prior to termination, as described in the section below titled
					Term and Termination.
				</Text>
				<Text style={styles.indentedHeaderText}>Promotion</Text>
				<Text style={styles.indentedNormalText}>
					You hereby grant meetluna.com the non-exclusive, royalty-free,
					worldwide right to use, promote and publicly display the Content for
					promotional purposes in connection with the Services.
				</Text>
				<Text style={styles.indentedHeaderText}>Third-Party Materials</Text>
				<Text style={styles.indentedNormalText}>
					You represent and warrant that you have all intellectual property
					rights in and to your Content and that the use and distribution of
					your Content will not infringe any intellectual property or other
					proprietary rights of a third party. If you use third-party materials,
					you must have the right to distribute those materials in the Content.
					You may not submit any Content that is subject to third party
					intellectual property or other proprietary rights unless you are the
					owners of such rights or have permission to include them in the
					Content.
				</Text>
				<Text style={styles.indentedHeaderText}>General</Text>
				<Text style={styles.indentedNormalText}>
					Except for the license rights granted by you in this Section,
					meetluna.com agrees that it obtains no right, title or interest from
					you to any Content, including any intellectual property rights
					incorporated in the Content.
				</Text>
				<Text style={styles.headerText}>Term and Termination</Text>
				<Text style={styles.normalText}>
					This meetluna.com Inbox Schedule commences on the date accepted by you
					(as set forth in the Terms) and shall continue until terminated as set
					forth herein. Either you or Company may terminate the meetluna.com
					Inbox Schedule: (1) without cause at any time upon thirty (30) days
					prior written notice to the other party; (2) immediately, without
					notice, for the other party’s material breach of the meetluna.com
					Inbox Schedule; or (3) immediately, without notice, in the event of
					the other party’s insolvency or bankruptcy, or upon the other party’s
					filing of a request for suspension of payment (or similar action)
					against the terminating party. Upon termination of the meetluna.com
					Inbox Schedule, you shall no longer use the Services for which the
					meetluna.com Inbox Schedule applies. Outstanding payment obligations
					and all provisions that by their nature are intended to survive
					termination or expiration of the meetluna.com Inbox Schedule shall so
					survive.
				</Text>
			</ScrollView>
		)
	}
}

TermsPage.propTypes = {
	navigation: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	headerText: {
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 16
	},
	indentedHeaderText: {
		textAlign: 'center',
		marginLeft: 32,
		marginTop: 16,
		marginBottom: 16
	},
	normalText: {
		color: '#383838',
		marginBottom: 16,
		textAlign: 'left',
		fontWeight: '300'
	},
	indentedNormalText: {
		color: '#383838',
		marginLeft: 32,
		marginBottom: 16,
		textAlign: 'left',
		fontWeight: '300'
	}
})

export default TermsPage
